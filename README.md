# Mobile Application Template

This React-Native application implements a skeleton application using a pluggable authentication capability and a navigation structure. The provided authentication plugin is for AWS cognito.

## AWS Cognito User Pool Configuration

To run the application you will need to configure AWS Cognito and provide the cognito credentials in a configuration file at `src/aws-exports.js`. The file must have the following configuration attributes.

```
/* RaS Application Users US East 1 */
const config = {
  identityPoolId: 'us-east-1:XXXX-XXXX-XXXX-XXXX-XXXX',
  region: 'us-east-1',
  userPoolId: 'us-east-1_XXXX',
  userPoolWebClientId: 'XXXX'
}
```

### Message Customizations

* Do you want to customize your MFA message?

  **Message**
  ```
  Your authentication code for RaS online services is {####}.
  ```

* Do you want to customize your SMS verification messages?

  **SMS Message**
  ```
  Your mobile phone verification code for RaS online services is {####}.
  ```

* Do you want to customize your email verification messages?

  **Verification type**\
  [x] Code

  **Email subject**
  ```
  Your verification code for RaS services
  ```

  **Email message**
  ```
  Your email address verification code for RaS online services is {####}.
  ```

* Do you want to customize your user invitation messages?

  **SMS message**
  ```
  Your username is {username} and temporary password for RaS online services is {####}.
  ```

  **Email subject**
  ```
  Your temporary password for RaS services
  ```

  **Email message**
  ```
  Your username is {username} and temporary password to access Rent-a-Space online services is {####}.
  ```

## Using the Template

You can create your own React-Native project based on this template as follows.

* Clone this repository.

* To initialize a React-Native project based on the template run the `init-from-template.sh` script as follows with the environments variables set to match your React-Native project and app.

  ```
  DEST_PROJECT="RaS_Mobile_App" \
  DEST_NAME="Rent-a-Space" \
  DEST_APP_ID="io.rent-a-space.RaS_Mobile_App" \
  ./init-from-template.sh
  ```

  > Your new React-Native project will be created within the same parent folder as the template repository.

* Once the script completes the XCode will launch and you will need to make the following manual configurations to the IOS project.

  * Add ${DEST_PROJECT}/node_modules/react-native/Libraries/CameraRoll/RCTCameraRoll.xcodeproj to 
    the "Libraries" folder in the project tree view on left TOC

  * Navigate to project settings (first node in tree view on left TOC)
    - Within the "General" tab, for both "${DEST_PROJECT}" and "${$DEST_PROJECT}Tests" targets, 
      set the "Team" under the "Signing" topic
    - Within the "Capabilities" tab, set "Keychain Sharing" to "on"
    - Within the "Build Phases" tab, expand "Link Binary With Libraries" topic and drag
      "Libraries/RCTCameraRoll.xcodeproj/Products/libRCTCameraRoll.a" from project view to
      list of libraries to link with.
 
  * Execute Product -> Clean from main menu
 
  * Execute Product -> Build from main menu
