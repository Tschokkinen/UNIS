# Log in and authentication base on solution found on Bitbucket:
# https://bitbucket.org/kubios/workspace/snippets/4X95xd/kubioscloud-example-for-authorization-code
# 
# Data iteration (lines 80-98) and sys.argv (lines 11-18) are self-written.

import sys
import requests
import json
import datetime

# Use your Kubios HRV App username and password
USERNAME = sys.argv[1]
PASSWORD = sys.argv[2]
CLIENT_ID = sys.argv[3]
LOGIN_URL = sys.argv[4]
TOKEN_URL = sys.argv[5]
REDIRECT_URI = sys.argv[6]
USER_AGENT = sys.argv[7]
csrf = sys.argv[8]

## Login data structure
login_data = {
    "client_id": CLIENT_ID,
    "redirect_uri": REDIRECT_URI,
    "username": USERNAME,
    "password": PASSWORD,
    "response_type": "code",
    "access_type": "offline",
    "_csrf": csrf,
}

## Start a session
session = requests.session()

## Open a session
login_response = session.post(
    LOGIN_URL,
    data=login_data,
    allow_redirects=False,
    headers={"Cookie": f"XSRF-TOKEN={csrf}", "User-Agent": USER_AGENT},
)

## Error handling
assert (
    login_response.status_code == 302
), f"Status: {login_response.status_code}, Authentication failed."

## Get the code
code = login_response.headers["Location"].split("=")[1]

## Exchange tokens
exch_data = {
    "client_id": CLIENT_ID,
    "code": code,
    "redirect_uri": REDIRECT_URI,
    "grant_type": "authorization_code",
}

exch_response = session.post(
    TOKEN_URL, data=exch_data
)
tokens = exch_response.json()

d = datetime.datetime(2020,1,1,0,0)

## Create headers
HEADERS = {"Authorization": tokens["id_token"], "User-Agent": USER_AGENT}

## Create URLS
BASE_URL = "https://analysis.kubioscloud.com"
GET_RESULT = BASE_URL + "/v2/result/self" + "?from=2020-01-01T00%3A00%3A00%2B00%3A00"

response = session.get(GET_RESULT, headers = HEADERS)
all_results = response.json()

# print(type(all_results))
# for key in all_results:
#     print(key)

result_dict = all_results['results'] # Get values of "results" key.

# print(result_dict)

return_results = [] # Create empty list for items to be returned.

for result in result_dict:
    # print(result, '\n')
    # print(result['create_timestamp'])
    # print(result['result']['mean_hr_bpm'])
    # print(result['result']['rmssd_ms'])
    new_entry = {} # New dictionary
    new_entry['create_timestamp'] = result['create_timestamp']
    new_entry['mean_hr_bpm'] = result['result']['mean_hr_bpm']
    new_entry['rmssd_ms'] = result['result']['rmssd_ms']
    return_results.append(new_entry) # Append new entry to list

return_results_to_json_format = json.dumps(return_results)
print(return_results_to_json_format, flush=True)