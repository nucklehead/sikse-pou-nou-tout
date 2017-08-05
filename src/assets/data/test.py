#!/usr/bin/env python
import json
import requests
from datetime import datetime

inputFile = "initData.json"
baseApi = "https://sikse-pou-nou-tout.herokuapp.com/"


with open(inputFile) as file:
    data = json.loads(file.read())
    headers = {"Content-Type": "application/json"}


    for presenter in data["presenter"]:
        res = requests.post(baseApi + "presenter", data = json.dumps(presenter), headers = headers)
        savedPresenter = res.json()
        for option in presenter["option"]:
            res = requests.post(baseApi + "option", data = json.dumps(option), headers = headers)
            savedOption = res.json()
            for event in option["event"]:
                event["OptionID"] = savedOption["ID"]
                event["Speaker"] = savedPresenter["ID"]
                event["Date"] = datetime.strptime(event["Date"], "%d/%m/%Y").isoformat() + "Z"
                res = requests.post(baseApi + "event", data = json.dumps(event), headers = headers)

    for sponsor in data["sponsor"]:
        res = requests.post(baseApi + "sponsor", data = json.dumps(sponsor), headers = headers)
    for video in data["video"]:
        res = requests.post(baseApi + "video", data = json.dumps(video), headers = headers)
    for account in data["account"]:
        res = requests.post(baseApi + "account", data = json.dumps(account), headers = headers)
        savedAccount = res.json()
        for comment in account["comment"]:
            comment["User"] = savedAccount["ID"]
            res = requests.post(baseApi + "comment", data = json.dumps(comment), headers = headers)
