## Difficulties

- First time using Auth0 (was using either own JWT implementation or AWS cognito), thus I had to learn it almost from scratch
- Issues with the mocking of the database access
- Issues with on the cUrl command (tricky syntax, forward slashes and quotes silent mistakes)
- Bit of hesitation between JS and TS
- Bit of hesitation between a using a project generator or own implementation (I made my own implementation)

## JEST: unwanted test

**SYMPTOM** Jest seems to run test that do not exists

**CAUSE** typescript build directory (dist/) is tested

**SOLUTION** remove it (dist/)

## HTTP: strange validation of a http parameter

**SYMPTOM** Controller Could not validate a param (id)

**CAUSE** the http-rest client strings should not use quotes (")

**SOLUTION** remove the quotes

## TEMPLATE:

**SYMPTOM**

**CAUSE**

**SOLUTION**
