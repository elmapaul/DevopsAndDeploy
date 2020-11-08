#!/usr/bin/env bash
# Used with tool like husky to prevent incorrect name in branch policy (befoe commit or push as hook)
# In the below code it will fail if branch name has not "_translations_needed" at the end

# Get current branch name
branch="$(git rev-parse --abbrev-ref HEAD)"; 

valid_branch='^((bugfix|hotfix|feature)\/[-a-zA-Z0-9_+]*(_translations_needed$))'; 

if [[ ! $branch =~ $valid_branch ]]; 
then echo 'Husky Pre-commit error: Wrong branch name [' $branch ']'; 
exit 1; 
fi; 
exit 0;