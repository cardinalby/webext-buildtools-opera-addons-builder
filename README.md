[![Build Status](https://travis-ci.com/cardinalby/webext-buildtools-opera-addons-builder.svg?branch=master)](https://travis-ci.com/cardinalby/webext-buildtools-opera-addons-builder)
### Introduction
*webext-buildtools* builder for deploying extension to Opera add-ons based on [upload-opera-extension](https://www.npmjs.com/package/upload-opera-extension).

If you need a **complete solution** for Web Extension build/deploy, go to 
[webext-buildtools-integrated-builder](https://github.com/cardinalby/webext-buildtools-integrated-builder) repo.
**But** this builder isn't included to integrated builder due to it's experimental status.    

To read what are *webext-buildtools* and *builders* go to 
[webext-buildtools-builder-types](https://github.com/cardinalby/webext-buildtools-builder-types) repo.

### Warning
This package is experimental and not tested. It Uses 
[upload-opera-extension](https://www.npmjs.com/package/upload-opera-extension) 
package which has 
[puppeteer](https://www.npmjs.com/package/puppeteer) in it's dependencies and requires downloading 
Chromium (**about 150 Mb**) 

### Installation
`npm install webext-buildtools-opera-addons-builder`

### Purpose
Builder doesn't allow publish new extension, only update existing (specified by `extensionId` in options) 
with new version.  

### Usage example
```js
const OperaAddonsUploadBuilder = require('webext-buildtools-opera-addons-builder').default;

const options = { 
    extensionId: '...',
    email: '...',
    password: '...'
}; 
const logMethod = console.log;
const builder = new ChromeWebstoreBuilder(options, logMethod);

builder.setInputZipFilePath('./packed.zip');

builder.requireUploadedExt();

const buildResult = await builder.build();
``` 

### Options
Options object described in [declarations/options.d.ts](declarations/options.d.ts)

[See](https://github.com/cardinalby/webext-buildtools-integrated-builder/blob/master/logMethod.md) how to get `logMethod` for pretty output.

### Inputs
1. **`setInputZipFilePath(...)`**. Path to zip file with packed extension dir.

You can use [webext-buildtools-dir-reader-mw](https://www.npmjs.com/package/webext-buildtools-dir-reader-mw)
to generate needed inputs from extension directory.

### Outputs

#### Uploaded ext
Require to upload extension to Opera add-ons<br>

*Required options:* `extensionId`, `email`, `password` <br>
*Require methods:* `requireUploadedExt()` <br>
*Assets:* 
`const extensionId = buildResult.getAssets().uploadedExt.getValue()` 