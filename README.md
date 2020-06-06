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

Eg2: deepEqual - We use this for comparing objects

```
const assert = require("assert");

describe("file to be tested", () => {
  context("function to be tested", () => {
    it("should do something", () => {
      assert.equal(1, 1);
    });

    it("should do something else", () => {  // 2nd Test
      assert.deepEqual({ name: "amir" }, { name: "john" }); // test will fail
      assert.deepEqual({ name: "amir" }, { name: "amir" }); // test will pass
    });
  });
});

```

Eg3: Pending Test. <br>

Sometimes a function is not written, or not ready to be tested. So this is the reminder from mocha to go back and finish it in the future.

```
const assert = require("assert");

describe("file to be tested", () => {
  context("function to be tested", () => {
    it("should do something", () => {
      assert.equal(1, 1);
    });

    it("should do something else", () => {
      assert.deepEqual({ name: "amir" }, { name: "amir" });
    });

    it("this is a pending test");       // Pending Test
  });
});

```

Eg4: Before, After, BeforeEach, AfterEach <br><br>

Before – this function runs before first test<br>
After – this function runs after last test<br><br>

NOTE: pending test is included in after and before case

```
const assert = require("assert");

describe("file to be tested", () => {
  context("function to be tested", () => {
    before(() => {
      console.log("=========== before function called============");
    });

    after(() => {
      console.log("=========== after function called ============");
    });

    it("should do something", () => {
      assert.equal(1, 1);
    });

    it("should do something else", () => {
      assert.deepEqual({ name: "amir" }, { name: "amir" });
    });

    it("this is a pending test");
  });
});

```

beforeEach – this function runs before each test<br>
afterEach – this function runs after each test<br><br>
NOTE – pending test is left in afterEach and beforeEach case<br>

```
const assert = require("assert");

describe("file to be tested", () => {
  context("function to be tested", () => {
    beforeEach(() => {
      console.log("=============== beforeEach function called ==============");
    });

    afterEach(() => {
      console.log("=============== afterEach function called ==============");
    });

    it("should do something", () => {
      assert.equal(1, 1);
    });

    it("should do something else", () => {
      assert.deepEqual({ name: "amir" }, { name: "amir" });
    });

    it("this is a pending test");
  });
});

```
