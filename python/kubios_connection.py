# https://www.nylas.com/blog/making-use-of-environment-variables-in-python/
# Move sensitive data to .env when solution is working!
import sys
# import logging
# import uuid
# from pprint import pprint
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


# Logging info
# logging.basicConfig(format="%(asctime)-15s [%(levelname)s]: %(message)s")

# log = logging.getLogger(__name__)
# log.setLevel(logging.INFO)

# csrf = str(uuid.uuid4())

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
# log.info("Authenticating to '%r' with client_id: %r", LOGIN_URL, CLIENT_ID)
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
# log.info("Got code: %r", code)

## Exchange tokens
# log.info("Exchanging code to tokens")
exch_data = {
    "client_id": CLIENT_ID,
    "code": code,
    "redirect_uri": REDIRECT_URI,
    "grant_type": "authorization_code",
}

exch_response = session.post(
    TOKEN_URL, data=exch_data
)
# log.info("Status code %r", exch_response.status_code)
tokens = exch_response.json()

d = datetime.datetime(2020,1,1,0,0)

## Create headers
HEADERS = {"Authorization": tokens["id_token"], "User-Agent": USER_AGENT}

## Create URLS
BASE_URL = "https://analysis.kubioscloud.com"
# GET_USER_INFO = BASE_URL + "/v2/user/self"
GET_RESULT = BASE_URL + "/v2/result/self" + "?from=2020-01-01T00%3A00%3A00%2B00%3A00"
# GET_DAILY_READINESS = BASE_URL + "/v2/result/self?types=readiness&daily=yes"

## Return personal information for the currently authenticated user ##
# log.info("Get user info")
# response = session.get(GET_USER_INFO, headers = HEADERS)
# user_info = response.json()

# log.info("Get all results")
response = session.get(GET_RESULT, headers = HEADERS)
all_results = response.json()

all_results_to_json_format = json.dumps(all_results)

# Send file as string to Node.JS and flush.
print(all_results_to_json_format, flush=True)