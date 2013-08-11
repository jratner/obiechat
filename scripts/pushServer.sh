#! /bin/sh

npm install
bower install
cp -r ../public/bower_comonents/* ../public/set_bower_comonents/
./compileLess.sh
git push ssh://5206a9fe500446f6e500002b@obiechat-version001.rhcloud.com/~/git/obiechat.git/ master
