import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html'
})
export class ScheduleFilterPage {
  tracks: Array<{name: string, isChecked: boolean, id: string}> = [];

  constructor(
    public confData: ConferenceData,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    // passed in array of track names that should be excluded (unchecked)
    let excludedTracks: any[] = this.navParams.data;

    this.confData.getOptions().subscribe((options: any) => {
      Object.keys(options).map(key => options[key]).forEach((option: any) => {
        this.tracks.push({
          name: option.Name,
          isChecked: (excludedTracks.findIndex(track => track.id === option.ID) === -1),
          id: option.ID
        });
      });

    });
  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.tracks.forEach(track => {
      track.isChecked = true;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    let excludedTracks = this.tracks.filter(c => !c.isChecked);
    this.dismiss(excludedTracks);
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
}
