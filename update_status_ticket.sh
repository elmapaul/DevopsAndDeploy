#!/usr/bin/env bash

# User credentials
username="YOUR_USERNAME"
tokenID="YOUR_TOKEN_ID"
jira_name="YOUR_JIRA_NAME"

# Status codes ID (e.g. 221 - "Ready for code review")
STATUS_ID="221"

# Get current branch name
BRANCH_NAME="$(git rev-parse --abbrev-ref HEAD)";

# Extract ticket ID from branch name (pattern: e.g. "XX-111" from feature/XX-111_test_branch)
ticket_id=${BRANCH_NAME#*/}; 
ticket_id=${ticket_id:0:6};

message="Ticket status has been updated.";

# Build URL string for request (HTTPS!)
JIRA_HOST="https://${jira_name}.atlassian.net/";
JIRA_URL="${JIRA_HOST}rest/api/3/issue/${ticket_id}/transitions";

curl -u $username:$tokenID -X POST --data '{"transition":{"id":'"${STATUS_ID}"'}}' -H "Content-Type: application/json" $JIRA_URL;

# Comment out the bellow line if you want interactivity
#read  -n 1 -p ">>> Request for updating ${JIRA_URL} has been executed. Press any key..."

exit 0 