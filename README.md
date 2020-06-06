# Node-JS-Unit-Testing
Unit testing in Node Application using Mocha, Chai, Chai-as-promised, Stubs, Sinon, Rewire, Istanbul/NYC,Test Driven Development

## Installation
npm install mocha -g    <br>
npm install chai    <br>
npm install cross-env   <br>
npm i chai-as-promised <br>

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

<b>i. Now suppose you have many test pages, to run them all at once </b>

mocha folder_to_test --recursive

``` mocha lib --recursive  ```

<b>ii. Search by Pattern: </b>

mocha ./lib/**/*.test.js		// executes all the .test.js files inside lib dir <br><br>
Sometime it gives wrong result, therefore always put single quotes in path <br>
mocha ‘./lib/**/*.test.js	‘	// executes all the .test.js files inside lib dir <br>
only .test.js runs, all the .js file are left  <br>

TRICK: In package.json file

```
{
  "name": "node_unit_testing",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha './lib/**/*.test.js'"    // added test script
  },
  "author": "Amir Mustafa",
  "license": "ISC",
  "dependencies": {
    "chai": "^4.2.0"
  }
}

```

Run ``` npm test ``` or``` npm run test ```


### D. Envirinment Variable and cross-env

pronting process.env.NODE_ENV   // prints undefined <br>

So to read it ```npm install cross-env```

In package json add this line

```
{
  "name": "node_unit_testing",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "cross-env NODE_ENV=development mocha './lib/**/*.test.js'"     //this line
  },
  "author": "Amir Mustafa",
  "license": "ISC",
  "dependencies": {
    "chai": "^4.2.0",
    "cross-env": "^7.0.2"
  }
}

```

Now process.env file will test

```
it("should do something", () => {
      assert.equal(1, 1);
      // console.log("ENV: ", process.env.NODE_ENV);

      if (process.env.NODE_ENV === "development") {     //detects env now
        // run some variable here for testing
        console.log("DEVELOPMENT MODE");    
      }
    });

```

### E. Basics of Testing
####    1. Standard Functions<br>

    project/lib/demo.js

    ```
    exports.add = function (a, b) {
        return a + b
    }

    ```

    project/lib/demo.test.js

    ```
    const chai = require("chai");
    const expect = chai.expect;

    var demo = require("./demo");

    describe("demo", () => {
    context("add", () => {
        it("should add two numbers", () => {
        expect(demo.add(1, 2)).to.equal(3);     // this line
        });
    });
    });

    ```

####    2. Callback Functions<br>

    demo.js

    ```
    exports.addCallback = function (a, b, callback) {
        setTimeout(() => {
            return callback(null, a + b);
        }, 500);
    };

    ```

    demo.test.js

    ```
        const chai = require("chai");
        const expect = chai.expect;

        var demo = require("./demo");

        describe("demo", () => {
        context("callback add", () => {
            it("should test the callback", (done) => {	// Parameter added
            demo.addCallback(1, 2, (err, result) => {     // this line
                expect(err).to.not.exist;
                expect(result).to.equal(3);
                done(); // must for callback
            });
            });
        });
        });

    ```

    ####    3. Promises<br>

    demo.js

    ```
        exports.addPromise = function (a, b) {
        // return Promise.reject(new Error('fake'))
        return Promise.resolve(a + b);
        };

    ```

    demo.test.js

    ```
        context("test promise", () => {
        it("should add with the promise callback", (done) => {
        demo.addPromise(1, 2).then((result) => {
            expect(result).to.equal(3);
            done();
        });
        });
    });
    ```

  ####    4. Catch errors if any<br>

    demo.js

    ```
        exports.addPromise = function (a, b) {
        // return Promise.reject(new Error('fake'))
        return Promise.resolve(a + b);
        };

    ```

    demo.test.js

   ```
    context("test promise", () => {
    it("should add with the promise callback", (done) => {
      demo
        .addPromise(1, 2)
        .then((result) => {
          expect(result).to.equal(3);
          done();
        })
        .catch((err) => {
          console.log("caught error");
          done(err);
        });
    });
  });


   ```

####  5. Using return style

```
context("test promise", () => {
    // it("should add with the promise callback", (done) => {
    //   demo
    //     .addPromise(1, 2)
    //     .then((result) => {
    //       expect(result).to.equal(3);
    //       done();
    //     })
    //     .catch((err) => {
    //       console.log("caught error");
    //       done(err);
    //     });
    // });

    it("should test promise with return", () => {
      return demo.addPromise(1, 2).then((result) => {
        expect(result).to.be.equal(3);
      });
    });
  });


```

NOTE: No need to write any catch for errors, return auto detects and throws like catch

#### 6. Calling promise by async await

demo.js

```
exports.addPromise = function (a, b) {
  // return Promise.reject(new Error('fake'))
  return Promise.resolve(a + b);
};

```

demo.test.js

```
it("should test promise with async await", async () => {
   let result = await demo.addPromise(1, 2);
   expect(result).to.equal(3);
});


```

#### 7.  Calling by chai plugin – chai-as-promised

This make calling promised function easly in one line<br><br> 

STEP1: ```npm i chai-as-promised```

demo.test.js

```
const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var demo = require("./demo");

…
…

it("should test promise with chai-as-promised", async () => {
     await expect(demo.addPromise(1, 2)).to.eventually.equal(3);    // this runs in 1 line
});

```

### F. Sinon

Sinon helps eliminate complexity in tests by allowing you to easily create so called test-doubles.<br />

Test-doubles are, like the name suggests, replacements for pieces of code used in your tests. Looking back at the Ajax example, instead of setting up a server, we would replace the Ajax call with a test-double. With the time example, we would use test-doubles to allow us to “travel forwards in time”.<br />

Test doubles are like functions we can inject into our programs from spies or stubs, they will let us know what is happening behind the scene.<br /><br />

demo.js

```
//spy on log
exports.foo = () => {
  //some operation
  console.log("console.log was called");
  console.warn("console.warn was called");

  return;
};

```
demo.test.js

```
const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const sinon = require("sinon");			        // for way 1
const sinonChai = require("sinon-chai");		//for way 2
chai.use(sinonChai);		                    //way 2

var demo = require("./demo");

…
…
context("test doubles", () => {
    it("should spy on log", () => {
      let spy = sinon.spy(console, "log");
      demo.foo();

      expect(spy.calledOnce).to.be.true;   // way 1 using sinon
      expect(spy).to.have.been.calledOnce; // way 2 using sinon-chai, (both are same)
      spy.restore();
    });
  });

```


