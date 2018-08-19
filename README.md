# Mobile Application Template

This React-Native application implements a skeleton application using a pluggable authentication capability and a navigation framework. The provided authentication plugin is for AWS cognito.

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
