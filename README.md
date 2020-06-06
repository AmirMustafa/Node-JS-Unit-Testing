# Node-JS-Unit-Testing
Unit testing in Node Application using Mocha, Chai, Chai-as-promised, Stubs, Sinon, Rewire, Istanbul/NYC,Test Driven Development

## Installation
npm install mocha -g
npm install chai

## Snippets

### Node's default assertion library

Eg1:

```
const assert = require("assert");

describe("file to be tested", () => {
  context("function to be tested", () => {
    it("should do something", () => {
      assert.equal(1, 2);   // test fails
      assert.equal(1, 1);   // test pass
    });
  });
});


```
Terminal : mocha test

Eg2: deepEqual - We use this for compapring objects

```
const assert = require("assert");

describe("file to be tested", () => {
  context("function to be tested", () => {
    it("should do something", () => {
      assert.equal(1, 1);
    });

    it("should do something else", () => {
      assert.deepEqual({ name: "amir" }, { name: "john" });
    });
  });
});

```


