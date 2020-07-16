#!/bin/bash

# gce project metadata key where the config json is stored as a string
meta_key=g-credentials
env_key=GOOGLE_APPLICATION_CREDENTIALS
config_file=/opt/g-credentials.json
env_file=/etc/profile

# command to set env variable
temp_cmd="export $env_key=$config_file"

# command to write $temp_cmd to file if $temp_cmd doesnt exist w/in it
perm_cmd="grep -q -F '$temp_cmd' $env_file || echo '$temp_cmd' >> $env_file"

# set the env var for only for the duration of this script.
# can delete this if you don't start processes at the end of
# this script that utilize the env var.
eval $temp_cmd

# set the env var permanently for any SUBSEQUENT shell logins
eval $perm_cmd

# load the config from the projects metadata
config=`curl -f http://metadata.google.internal/computeMetadata/v1/project/attributes/$meta_key -H "Metadata-Flavor: Google" 2>/dev/null`

# write it to file
echo $config > $config_file


cd ~

echo "deb http://packages.cloud.google.com/apt gcsfuse-bionic main" | sudo tee /etc/apt/sources.list.d/gcsfuse.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -

sudo apt-get update && sudo apt-get install fuse
sudo groupadd fuse
sudo adduser $USER fuse
sudo chmod g+rw /dev/fuse
sudo chgrp fuse /dev/fuse

sudo apt-get install gcsfuse
sudo usermod -a -G fuse $USER

mkdir bucket
GOOGLE_APPLICATION_CREDENTIALS=/opt/g-credentials.json gcsfuse ccextractor-samples bucket


