 
#  @file        run.sh
#  @author      morgan bergen <morganmahabergen@icloud.com>
#  @date        2024-01-04
#  @commit      #
#  @description bash script to run application quickly
#
#  the plan is to eventually have the application containerized
#  with commands from dockerfile, however the problem that we run into
#  is that the pocketbase executable is giving some issues
#
#  usage - bash run.sh
#	
#	 upon downloading the repository -
#  
#  cd server
#  npm install
#  cd ../client
#  npm install
#  cd ../db/pocketbase
#  wget https://https://github.com/pocketbase/pocketbase/releases
#  			/download/v0.22.22/pocketbase_0.22.22_darwin_amd64.zip
#  unzip pocketbase_<version>_<platform>_<arch>.zip
#  chmod +x pocketbase
#  cd ../../server/services/aiy
#  pip install -r requirements.txt
#  cd ../../
#  touch .env
#
#

#!/bin/bash

# Function to run a command in a new pane within the same iTerm window
run_new_pane() {
    local cmd=$1
    local dir=$2
    osascript <<EOF
        tell application "iTerm"
            tell current window
                create tab with default profile
                tell current session of current tab
                    write text "cd $(pwd)/$dir; $cmd"
                end tell
            end tell
        end tell
EOF
}

# Initialize first command in the current pane
osascript <<EOF
tell application "iTerm"
    if (count of windows) = 0 then
        create window with default profile
    end if
    tell current session of current window
        write text "cd $(pwd)/server; npm run dev"
    end tell
end tell
EOF

# Commands to execute in new panes
run_new_pane "python3 server.py" "server/services/aiy"
run_new_pane "./pocketbase serve" "db/pocketbase"
run_new_pane "npm start" "client"

echo "All commands have been launched in new panes!"
