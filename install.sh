#!/bin/bash

# ------------
# RUBY MODULES
# Ruby required. Windows users: https://forwardhq.com/support/installing-ruby-windows
# ------------

# SASS and SASS CSS importer
if ! command -v sass; 
    then
        gem install sass --prerelease
        gem install sass-css-importer --prerelease #TODO: make this optional
fi


# ------------
# NODE MODULES
# Node.js required. Windows users: http://nodejs.org/
# ------------

# NPM
if ! command -v npm; 
    then
        curl http://npmjs.org/install.sh | sh
fi

# BLESS
if ! command -v blessc; 
    then
        npm install -g blessc
fi


# GRUNT
if ! command -v grunt; 
    then
        npm install -g grunt-cli
fi

# GRUNT MODULES

npm install grunt-contrib-jshint            # js testing
npm install grunt-contrib-sass              # sass module
npm install grunt-contrib-concat            # concatenator
npm install grunt-contrib-watch             # watch files
npm install grunt-contrib-copy              # copy files
npm install grunt-contrib-uglify            # minify js files
npm install grunt-contrib-htmlmin           # minify html files
npm install grunt-processhtml               # building html files
npm install grunt-ssh                       # remote deploy
# npm install grunt-usemin                  # replace resources with minified versions
# minifaction of css is done via sass

