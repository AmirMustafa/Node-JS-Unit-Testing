# Node-JS-Unit-Testing
Unit testing in Node Application using Mocha, Chai, Chai-as-promised, Stubs, Sinon, Rewire, Istanbul/NYC,Test Driven Development

## Installation
npm install mocha -g
npm install chai

## Snippets

### A. Node's default assertion library

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

### B. Chai

a. Chai is the assertion library. Node js has the assertion library. It is very limited. Chai is the best standard in market for assertion <br>

b. Chai has 3 ways you can assert same code –  should, expect and assert
Expect is the best method.  <br>

c. Another important thing in chai is that it has many plugins which is helpful in many tests and make our life easier.

<br><br>

Eg1: chai basics

```
const chai = require("chai");
const expect = chai.expect;		// we use expect style of assertion

describe("chai test", () => {
  it("should compare some values", () => {
    expect(1).to.equal(1);  //this test will pass
    expect(1).to.equal(2);  // this test will fail
  });
});

```

Eg2: deep equal

```
const chai = require("chai");
const expect = chai.expect;

describe("chai test", () => {
  it("should do some other stuff", () => {
    expect({ name: "Amir" }).to.deep.equal({ name: "Amir" });   // test pass
  });
});


```

Eg3: Some other ways to use expect()

```
const chai = require("chai");
const expect = chai.expect;

describe("chai test", () => {
  it("should compare some values", () => {
    expect(1).to.equal(1);
  });

  it("should do some other stuff", () => {
    expect({ name: "Amir" }).to.deep.equal({ name: "Amir" });
    expect({ name: "foo" }).to.have.property("name").to.equal("foo");
    expect(5 > 8).to.be.false;
    expect({}).to.be.a("object");
    expect("foo").to.be.a("string");
    expect(3).to.be.a("number");
    expect("bar").to.be.a("string").with.lengthOf(3);
    expect([1, 3, 5].length).to.equal(3);
    expect(null).to.be.null;
    expect(undefined).to.not.exist;
    expect(1).to.exist;
  });
});

```

### C. CLI and Test Commands

What ever name of the file is present eg. cart.js. For unit testing create cart.test.js.In this test page you will write node unit testing. <br>

Now suppose you have many test pages, to run them all at once

mocha <folder> --recursive

``` mocha lib --recursive  ```