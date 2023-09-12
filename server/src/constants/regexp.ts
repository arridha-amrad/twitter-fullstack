export const usernameRegExp = /^[a-z](_(?!\_|\.)|(.(?!\_|\.))|[a-z0-9]){4,14}$/;
// must start with lowercase
// can be followed by _ or . or lowercase-number.
// but _ can't be followed by _ or .
// . can't be followed by _ or .
// total min length 5, max length 15

export const passwordRegExp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[!@#$%*])[a-zA-Z\d!@#$%*]{6,}$/;
// requires 6 characters or more with combination at least one uppercase, one lowercase, one number and one symbol(! @ # $ % *)

export const emailRegExp =
  /^([\w\d\-\.]+)@([\w\d\-]+)\.([a-z]{2,5})(\.[a-z]{2,5})?$/;

export const lastNameRegExp = /^[a-z\s\-\']+$/i;

export const firstNameRegExp = /^[a-z\-\']+$/i;
