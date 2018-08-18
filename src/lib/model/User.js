/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

import { gplusProfilePicture, gravatar } from "../utils/avatar";

const TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Authenticatable user. 
 */
export default class User {

  constructor() {

    this.username = "";
    this.emailAddress = "";
    this.mobilePhone = "";

    this.password = "";

    this.enableBiometric = false;

    this.firstName = "";
    this.familyName = "";
    this.address = "";

    this.profilePictureUrl = null;

    // If MFA is enabled then TOTP is disabled 
    // then SMS will be the preferred MFA type
    this.enableMFA = false;
    this.enableTOTP = false;

    this.rememberFor24h = false;

    this.emailAddressVerified = false;
    this.mobilePhoneVerified = false;
  }

  toJSON() {
    return {
      emailAddress: this.emailAddress,
      mobilePhone: this.mobilePhone,
      firstName: this.firstName,
      familyName: this.familyName,
      address: this.address,
      enableBiometric: this.enableBiometric,
      enableMFA: this.enableMFA,
      enableTOTP: this.enableTOTP,
      rememberFor24h: this.rememberFor24h,
      emailAddressVerified: this.emailAddressVerified,
      mobilePhoneVerified: this.mobilePhoneVerified
    }
  }

  fromJSON(data) {
    this.emailAddress = data["emailAddress"];
    this.mobilePhone = data["mobilePhone"];
    this.firstName = data["firstName"];
    this.familyName = data["familyName"];
    this.address = data["this.address"];
    this.enableBiometric = data["enableBiometric"];
    this.enableMFA = data["enableMFA"];
    this.enableTOTP = data["enableTOTP"];
    this.rememberFor24h = data["rememberFor24h"];
    this.emailAddressVerified = data["emailAddressVerified"];
    this.mobilePhoneVerified = data["mobilePhoneVerified"];
  }

  /**
   * Returns the users name. Which is the full name
   * if available otherwise it will be the username 
   * used to log in with
   */
  name() {
    if (this.firstName && this.firstName.length > 0
      && this.familyName && this.familyName.length > 0) {

      return this.firstName + " " + this.familyName.length;
    } else {
      return this.username;
    }
  }

  /**
   * Returns a title name for the avatar initials
   */
  avatarTitle() {
    if (this.firstName && this.firstName.length > 0
      && this.familyName && this.familyName.length > 0) {

      return (this.firstName.charAt(0) + this.familyName.charAt(0))
        .toUpperCase();

    } else {

      return this.username
        .substr(0, 3)
        .toLowerCase();
    }
  }

  /**
   * Returns a uri to the user's avatar picture. This
   * will first check for a profile picture on gplus
   * and if not found it will check for a profile
   * picture from gravatar.
   * 
   * @param {*} cb Callback to pass the retrieved URI to
   */
  avatarUri(cb) {

    if (this.profilePictureUrl) {
      cb(this.profilePictureUrl);

    } else {

      if (this.emailAddress && this.emailAddress.length > 0) {

        // Check for a profile picture on Google Plus Picasa
        gplusUrl = gplusProfilePicture(
          url => {

            if (!url) {

              // Check for a profile picture hosted on gravatar
              gravatar(
                url => {
                  this.profilePictureUrl = url;
                  cb(this.profilePictureUrl);
                },
                this.emailAddress, { size: 320 }
              );

            } else {
              this.profilePictureUrl = url;
              cb(this.profilePictureUrl);
            }
          },
          this.emailAddress
        );
      }
    }
  }

  /**
   * Returns if this object contains sufficient 
   * data to be considered valid
   */
  isValid() {
    return (
      this.username.length > 0 &&
      this.emailAddress.length > 0 &&
      this.mobilePhone.length > 0
    );
  }

  /**
   * Returns whether this User registration has
   * been confirmed by either email or SMS.
   */
  isConfirmed() {
    return this.emailAddressVerified || this.mobilePhoneVerified;
  }

  /**
   * Check if the user has timed out
   * 
   * @param {*} timestamp 
   */
  isTimedout(timestamp) {
    return !this.rememberFor24h || (timestamp + TIMEOUT) < Date.now();
  }

  /**
   * Returns whether this user's sign-in should
   * be remembered.
   */
  rememberSignIn() {
    return this.rememberFor24h;
  }

  /**
   * Password validation
   * 
   * @param {*} password  password to check for policy compliance
   */
  validatePassword(password) {

    this.password = "";

    if (password.length == 0) {
      return {
        shortMessage: null,
        longMessage: "The password is required."
      };
    }

    // Complete match string
    //
    // "^(?=.*[-_()!@#$%^&+*])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[-_()!@#$%^&+*a-zA-Z0-9]{8,}$"

    let lengthCheck = /[-_()!@#$%^&+*a-zA-Z0-9]{8,}$/;
    if (!lengthCheck.test(password)) {
      return {
        shortMessage: "too short",
        longMessage: "The password must have a minimum length of 8 characters."
      };
    }

    let specialCharCheck = /^(?=.*[-_()!@#$%^&+*])[-_()!@#$%^&+*a-zA-Z0-9]{8,}$/;
    if (!specialCharCheck.test(password)) {
      return {
        shortMessage: "invalid",
        longMessage: "The password must have at least one special character."
      };
    }

    let lowercaseCharCheck = /^(?=.*[a-z])[-_()!@#$%^&+*a-zA-Z0-9]{8,}$/;
    if (!lowercaseCharCheck.test(password)) {
      return {
        shortMessage: "invalid",
        longMessage: "The password must have at least one lowercase character."
      };
    }

    let uppercaseCharCheck = /^(?=.*[A-Z])[-_()!@#$%^&+*a-zA-Z0-9]{8,}$/;
    if (!uppercaseCharCheck.test(password)) {
      return {
        shortMessage: "invalid",
        longMessage: "The password must have at least one uppercase character."
      };
    }

    let numberCheck = /^(?=.*[0-9])[-_()!@#$%^&+*a-zA-Z0-9]{8,}$/;
    if (!numberCheck.test(password)) {
      return {
        shortMessage: "invalid",
        longMessage: "The password must have at least one number character."
      };
    }

    this.password = password;
    return null;
  }

  /**
   * Password verification
   * 
   * @param {*} password  password to verify if it matches the instance value
   */
  verifyPassword(password) {

    if (password.length == 0) {

      return {
        shortMessage: null,
        longMessage: "The password is required."
      }

    } else if (password.length > 0 && password != this.password) {

      return {
        shortMessage: "not matching",
        longMessage: "The verification password does not match the first password you entered."
      };
    }

    return null;
  }

  /**
   * Username validation
   * 
   * @param {*} username  the user's login name
   * @param {*} set          updates the property if valid else resets it
   */
  validateUsername(username, set = true) {

    if (set) {
      this.username = "";
    }

    if (username.length == 0) {
      return {
        shortMessage: null,
        longMessage: "The username is required."
      };
    }

    if (username.length < 3) {
      return {
        shortMessage: "too short",
        longMessage: "The username must be at least 3 characters long."
      };
    }

    if (set) {
      this.username = username;
    }
    return null;
  }

  /**
   * Email address validation and setting
   * 
   * @param {*} emailAddress  email address
   * @param {*} set          updates the property if valid else resets it
   */
  validateEmailAddress(emailAddress, set = true) {

    if (set) {
      this.emailAddress = "";
    }

    if (emailAddress.length == 0) {
      return {
        shortMessage: null,
        longMessage: "The email address is required."
      };
    }

    let emailFormatCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailFormatCheck.test(emailAddress)) {
      return {
        shortMessage: "invalid",
        longMessage: "'" + emailAddress + "' is not a valid email address."
      };
    }

    if (set) {
      this.emailAddress = emailAddress;
    }
    return null;
  }

  /**
   * Mobile phone number validation and setting
   * 
   * @param {*} mobilePhone  mobile phone number
   * @param {*} set          updates the property if valid else resets it
   */
  validateMobilePhone(mobilePhone, set = true) {

    if (set) {
      this.mobilePhone = "";
    }

    if (mobilePhone.length == 0) {
      return {
        shortMessage: null,
        longMessage: "The mobile phone number is required."
      };
    }

    let mobilePhoneFormatCheck = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/;
    if (!mobilePhoneFormatCheck.test(mobilePhone)) {
      return {
        shortMessage: "invalid",
        longMessage: "'" + mobilePhone + "' is not a valid phone number."
      };
    }

    if (set) {
      this.mobilePhone = mobilePhone;
    }
    return null;
  }
}
