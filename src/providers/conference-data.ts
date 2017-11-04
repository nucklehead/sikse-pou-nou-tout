import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { UserData } from './user-data';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

let apiUrl = '/server/api/';

@Injectable()
export class ConferenceData {
  data: any;
  sessions: any[];
  options: any[];


  constructor(public http: Http, public user: UserData) { }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('assets/data/data.json')
        .map(this.processData, this);
    }
  }

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data.json();

    this.data.tracks = [];

    // loop through each day in the schedule
    this.data.schedule.forEach((day: any) => {
      // loop through each timeline group in the day
      day.groups.forEach((group: any) => {
        // loop through each session in the timeline group
        group.sessions.forEach((session: any) => {
          session.speakers = [];
          if (session.speakerNames) {
            session.speakerNames.forEach((speakerName: any) => {
              let speaker = this.data.speakers.find((s: any) => s.name === speakerName);
              if (speaker) {
                session.speakers.push(speaker);
                speaker.sessions = speaker.sessions || [];
                speaker.sessions.push(session);
              }
            });
          }

          if (session.tracks) {
            session.tracks.forEach((track: any) => {
              if (this.data.tracks.indexOf(track) < 0) {
                this.data.tracks.push(track);
              }
            });
          }
        });
      });
    });

    return this.data;
  }

  getTimeline(queryText = '', excludeTracks: any[] = [], segment = 'all') {
    let data: any = {};
    return this.getSessions().map((sessions: any) => {
      console.log("getSessions");
      console.log(JSON.stringify(sessions));
      data["shownSessions"] = 0;
      let groups: any[] = [];
      return this.getOptions().map((options: any) => {
        console.log("options");
        console.log(JSON.stringify(options));
        options.forEach((option: any) => {
          let group: any = {};
          group["Name"] = option.name;
          group["sessions"] = options.filter((session: any) => session.optionID === option.ID);
          groups.push(group);
        });
        data["groups"] = groups;


        queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
        let queryWords = queryText.split(' ').filter(w => !!w.trim().length);
        data.groups.forEach((group: any) => {
          group["hide"] = true;
          group.sessions.forEach((session: any) => {
            session.date = new Date(session.date);
            // check if this session should show or not
            this.filterSession(session, queryWords, excludeTracks, segment);
            if (!session.hide) {
              // if this session is not hidden then this group should show
              group.hide = false;
              data.shownSessions++;
            }
          });

        });
        console.log("I am data");
        console.log(JSON.stringify(data));


        return data;
      });
    });
  }

  filterSession(session: any, queryWords: string[], excludeTracks: any[], segment: string) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (session.title.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    let matchesTracks = true;
      excludeTracks.forEach(track => {
        if(session.optionID === track.ID ){
        matchesTracks = false;
      }
    });

    // if the segement is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(session.title)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden

    session["hide"] = !(matchesQueryText && matchesTracks && matchesSegment);

  }

  getSpeakers() {
    return this.http.get(apiUrl+'presenter');
  }

  getSessions() {
    return  this.http.get(apiUrl+'event').map(res => res.json())
  }

  getSpeakerSessions(speaker: any){
    this.getSessions().subscribe((sessions: any) => {
      speaker["Event"] = sessions.filter((session: any) => session.presenter === speaker.ID);
    });
  }

  getOptions() {
    return this.http.get(apiUrl+'option').map(res => res.json())
  }

  getMap() {
    return this.load().map((data: any) => {
      return data.map;
    });
  }

}
