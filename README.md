![Alt tapered logo](https://image.ibb.co/eiJTxv/A0033738_order_Mock_03071107_2.jpg "Optional title")

## Synopsis
Easy inline test writing.
tapered uses **Babel** and **Webpack** to generate **Tape** test files from test code written inline in comments

## Installation
npm install tapered.js

## Setup
#### 1. babelrc

Add the following lines to your .babelrc file.
* "presets": ["env"],
* "plugins": ["tapered.js/tapered-babel-plugin.js"]

#### 2. webpack.config
Add these requires to the top of your webpack.config file:
  * const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  * const tapered = require('tapered.js/tapered-webpack-plugin.js');

Add the following to your webpack's plugins array and specify the location of your test file e.g.  _/tests/tape-test-sample.js_
```javascript
plugins : [
new tapered(),
new webpack.optimize.UglifyJsPlugin({
extractComments: {
condition: /dab/,
filename: '_INSERT TEST FILE LOCATION HERE_'
        },
    }),
],
```
#### 3. tapered-webpack-plugin.js
Specify the _same_ desired test file location for the fields marked with _'INSERT TEST FILE LOCATION HERE'_ in the tapered.js folder inside your _node modules_ directory:  **_/node_modules/tapered.js/tapered-webpack-plugin.js_**
```javascript
const file = compilation.assets['INSERT DESIRED TEST FILE LOCATION HERE'];
compilation.assets['INSERT DESIRED TEST FILE LOCATION HERE']
```
## Usage

#### Quick Start
```javascript
>>: _test name_
>>:a: _specify assertion_
```
#### Simple Unit Test Writing
###### Let's write a test file for the code below:
```javascript
const demo = {};
demo.add = function(a, b) {
  return a + b;
}
```
###### We write our tapered tests in _**block**_ comments
```javascript
/* %tapered */

/*
>>:add
>>:a: demo.add(1, 2) equal 3 | should add numbers
>>:a: demo.add(0, 1) notEqual 2 | should add numbers correctly
*/
```
###### This is transpiled to Tape code as follows:
```javascript
const demo = require('/src/demo.js');

test('add', function (t) {
	t.equal(demo.add(1, 2),  3 , 'should add numbers');
	t.notEqual(demo.add(0, 1),  2 , 'should add numbers correctly');
	t.end();
});
```
## API Reference

#### Key Reminders
**_1. All tapered code must be written inside of _**block**_ comments._**
**_2. Tests must always begin with a name._**

Syntax | Function
------------ | -------------
%tapered | requires the file for testing
>>: _name_ | define test name
>>: _variables_ | define variables
>>:a: _assertions_ | define assertions
%g | defines global variables accessible across the entire test file
>>:x: | skips a test
>>:o: | tests only that test
>>:p: | specifies number of assertions to run per test

#### Assertions
##### Components
1. Expression e.g. _demo.multiply(1,2)_
2. Assertion e.g. _equal_
3. Expected e.g. _2_
4. Description/Message e.g. _should multiply numbers_

##### Format
**_>>:a: _Expression_ _Assertion_ _Expected_ _|_ _optional message__**

_**>>:a: demo.multiply(1,2) equal 2 | should multiply numbers**_

#### Supported Assertions

Assertion | Function
---------|-------
equal | asserts equality
notEqual | asserts inequality
deepEqual | asserts deep equality - use when comparing objects
notDeepEqual | asserts deep inequality - use when comparing objects
