#!/usr/bin/env python
import json
import requests

inputFile = "init-data.json"
baseApi = "https://sikse-pou-nou-tout.herokuapp.com/"


with open(inputFile) as file:
    data = json.loads(file.read())

    for presenter in data["presenter"]:
        res = requests.post(baseApi + "presenter", presenter)
        savedPresenter = res.json()
        for option in presenter["option"]:
            res = requests.post(baseApi + "option", option)
            savedOption = res.json()
            for event in option["event"]:
                event["OptionID"] = savedOption["ID"]
                event["Speaker"] = savedPresenter["LastName"] + ", " + savedPresenter["FirstName"]
                res = requests.post(baseApi + "event", event)

    for sponsor in data["sponsor"]:
        res = requests.post(baseApi + "sponsor", sponsor)
    for video in data["video"]:
        res = requests.post(baseApi + "video", video)
    for account in data["account"]:
        res = requests.post(baseApi + "account", account)
        savedAccount = res.json()
        for comment in account["comment"]:
            comment["User"] = savedAccount["ID"]
            res = requests.post(baseApi + "comment", comment)
