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

# bucket mounting
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

# installation of mono and tesseract
sudo apt install gnupg ca-certificates
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF
echo "deb http://download.mono-project.com/repo/ubuntu wheezy/snapshots/4.8.0 main" | sudo tee /etc/apt/sources.list.d/mono-official.list
sudo apt update

# this is specific solution for the Ubuntu version, since the official dependencies doesn't work.
apt-get install -y mono-devel
apt install -y tesseract-ocr

# run tests
sudo ldconfig

cp /root/bucket/ccextractor /root/
cp -R /root/bucket/tester /root/

sudo chmod +x ccextractor
sudo chmod +x tester/ccextractortester

mkdir tmpFolder
mkdir results
mkdir report

cd /root/tester
sudo /root/tester/ccextractortester --entries "/root/bucket/tests.xml" --executable "/root/ccextractor" --tempfolder "/root/tmpFiles" --timeout 3000 --resultfolder "/root/results" --samplefolder "/root/bucket/samples" --reportfolder "/root/report"

