#!/bin/bash

set -u

echo -e "Project Init Environment"
echo -e "------------------------"
echo -en "\nShort name:         "
echo -e "DEST_PROJECT = ${DEST_PROJECT}"
echo -en "Display name:       "
echo -e "DEST_NAME = ${DEST_NAME}"
echo -en "App Identifier:     "
echo -e "DEST_APP_ID = ${DEST_APP_ID}\n"

SRC_PROJECT="Mobile_App_Template"
SRC_NAME="AppBricks Mobile App Template"
SRC_APP_ID="io.appbricks.$SRC_PROJECT"

set +u

cd ..
if [[ ! -e $SRC_PROJECT ]]; then
  echo -e "ERROR! The template project folder needs to be named '$SRC_PROJECT'.\n"
  exit 1
fi

set -ex

rm -fr $DEST_PROJECT
react-native init $DEST_PROJECT
rm $DEST_PROJECT/App.js
cp -r $SRC_PROJECT/src $DEST_PROJECT
cp -r $SRC_PROJECT/vendor $DEST_PROJECT
cp $SRC_PROJECT/package.json $DEST_PROJECT
cp $SRC_PROJECT/index.js $DEST_PROJECT

rm -fr $DEST_PROJECT/ios/$DEST_PROJECT
cp -r $SRC_PROJECT/ios/$SRC_PROJECT $DEST_PROJECT/ios/$DEST_PROJECT

sed -i '' "s|\"displayName\": \"$DEST_PROJECT\"|\"displayName\": \"$DEST_NAME\"|g" \
  $DEST_PROJECT/app.json

for f in $(find $DEST_PROJECT/ios/$DEST_PROJECT -type f -print); do
  FILE_TYPE=$(file $f)
  FILE_TYPE=${FILE_TYPE#*ASCII }
  if [[ "$FILE_TYPE" == "text" ]]; then
    sed -i '' "s|$SRC_PROJECT|$DEST_PROJECT|g" $f
    sed -i '' "s|$SRC_APP_ID|$DEST_APP_ID|g" $f
    sed -i '' "s|$SRC_NAME|$DEST_NAME|g" $f
  fi
done

cd $DEST_PROJECT
  npm install
  react-native link
  react-native link amazon-cognito-identity-js
cd -

sed -i '' "s|com.facebook.REACT.|io.rent-a-space.|g" \
  $DEST_PROJECT/ios/$DEST_PROJECT.xcodeproj/project.pbxproj

sed -i '' -E -e "s|PRODUCT_NAME = $DEST_PROJECT;|PRODUCT_BUNDLE_IDENTIFIER = \"io.rent-a-space.$DEST_PROJECT\";\\
        PRODUCT_NAME = $DEST_PROJECT;|g" \
  $DEST_PROJECT/ios/$DEST_PROJECT.xcodeproj/project.pbxproj

sed -i '' "s|<string>AppBricks</string>|<string>$DEST_NAME</string>|g" \
  $DEST_PROJECT/ios/$DEST_PROJECT/Info.plist

open $DEST_PROJECT/ios/$DEST_PROJECT.xcodeproj

set +ex
