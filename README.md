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
demo.test.js - using Spy on console.log and warn

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


### G. Code Isolation / Stubs

a. One of the important part of unit testing is code isolation and stubs. For example there are functions which require saving in database and console something, we are do not have to actually save in database and pass that save. Therefore stubs is used. <br />
b. So actual code is checked whether running or not but not executed.

demo.js

```
//stub on warn
exports.foo = () => {
  //some operation
  console.log("console.log was called");
  console.warn("console.warn was called");

  return;
};

```

Eg1 - basic stub
demo.test.js

```
it("should stub console warn", () => {
   let stub = sinon.stub(console, "warn");// console.warn will not print, but test will pass
   demo.foo();
   expect(stub).to.have.been.calledOnce;
});

// console.warn was not called for stub

```

If we have used spy, console.warn will print - i.e. executed
For stub - console.warn is checked but not printed (i.e. not executed,just tested) <br/> <br/>

Eg2 - Sending my message instead of stubbed message function

```
it("should stub console warn", () => {
      let stub = sinon.stub(console, "warn").callsFake(() => {
        console.log("message from stub");       // use callsFake if want to replace with my message
      });
      demo.foo();
      expect(stub).to.have.been.calledOnce;
      stub.restore();	// this is mandatory to close for next stub or spy call
});

```

Eg3 - To test whether we have stubbed function o/p

```
it("should stub console warn", () => {
      let stub = sinon.stub(console, "warn").callsFake(() => {
        console.log("message from stub");
      });
      demo.foo();
      expect(stub).to.have.been.calledOnce;
      expect(stub).to.have.been.calledWith("console.warn was called");  // this string should o/p of actual function we stubbed - 2 should not be there - above message is written in demo.js
      stub.restore();

});

```

### H. Rewire

Rewire adds a special setter and getter to modules so you can modify their behaviour for better unit testing. You may<br>
i. 	inject mocks for other modules or globals like process <br>
ii.	inspect private variables <br>
iii. override variables within the module. <br>

Ref - https://github.com/jhnns/rewire 

<br />
Whenever there is call to private funtion (i.e. function without exports.functionname), inside a function, we use rewire to call it. <br/>

TRICK <br/>
a.	Load the rewire module <br />
b.	Replace require with rewire for the file to test    <br />

Eg.

demo.js

```
//stub createfile
exports.bar = async (fileName) => {
  await exports.createFile(fileName);
  let result = await callDB(fileName);	   // private function call – therefore use rewire
  return result;
};

```

demo.test.js

```
const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const rewire = require("rewire");

var demo = rewire("./demo");		// replace require with rewire

…
…

context("stub private functions with rewire", () => {
    it("should stub createFile", async () => {
      let createStub = sinon.stub(demo, "createFile").resolves("create_stub");
      let callStub = sinon.stub().resolves("calldb_stub");

      demo.__set__("callDB", callStub);
      let result = await demo.bar("test.txt");

      expect(result).to.equal("calldb_stub");
      expect(createStub).to.be.calledOnce;
      expect(createStub).to.have.been.calledWith("test.txt");
      expect(callStub).to.be.calledOnce;
    });
  });

```

<b>Important Reminder</b>

Please remember to use <b>var</b> instead of const when using rewire to import a module, it's easy to miss when you use const everything at the top of your code.<br>
This is because rewire will inject the rewired versions, and we reset that during teardown. It's ok to use const on requiring rewire itself, but use var for everything else.<br><br>

```
const rewire = require('rewire');
var myModule = rewire('../path/to/custom/module');
```


### H. Users.get()  (Fecthing Operation - MongoDB)

a. 
model/users.js (user model) - USER model

```
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    age: Number
}, {
    collection: 'users'
}); //overrides default collection name auto created

module.exports = mongoose.model('User', UserSchema);

```

users.js

```
exports.get = function (id, callback) {
    if (!id) {      // Write test for this
        return callback(new Error('Invalid user id'));
    }

    User.findById(id, function (err, result) {
        if (err) {
            return callback(err);
        }

        return callback(null, result);  // write test for this
    });
}


```

users.test.js

```
const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const rewire = require("rewire");

var mongoose = require("mongoose");

var users = require("./users");
var User = require("./models/user");

var sandbox = sinon.createSandbox();    // Create sandbox

describe("users", () => {
  let findStub;
  let sampleArgs;
  let sampleUser;

  beforeEach(() => {
    sampleUser = {
      // this data should be similar to model schema data
      id: 123,
      name: "amir",
      email: "amirengg15@gmail.com",
      age: 27,
    };

    findStub = sandbox.stub(mongoose.Model, "findById").resolves(sampleUser);   // referncing mongoDB Fetch

  });

  afterEach(() => {
    sandbox.restore(); // this equal to stub.restore();  but for sandbox version
  });

context("get", () => {			// call user.get
    it("should check for an id", (done) => {        // test for unit 1
      users.get(null, (err, result) => {
        expect(err).to.exist;
        expect(err.message).to.equal("Invalid user id"); // this err msg is exact same as in function testing
        // expect(err.message).to.equal("Invalid user idasa"); // Err msg not same as function ==> fail test
        done();
      });
    });


    it("should call findUserById with id and return result", (done) => {    // test for unit 2
      sandbox.restore();
      let stub = sandbox
        .stub(mongoose.Model, "findById")
        .yields(null, { name: "amir" });	// 1st para = err if any, 2nd = data

      users.get(123, (err, result) => {	// my id of object
        expect(err).to.not.exist;
        expect(stub).to.have.been.calledOnce;
        expect(stub).to.have.been.calledWith(123);
        expect(result).to.be.a("object");
        expect(result).to.have.property("name").to.equal("amir");	// my object name

        done();
      });
    });


```

Run mocha users.test <br/>

b. Catch error if there is one

```
it("should catch error if there is one", (done) => {
      sandbox.restore();

      let stub = sandbox
        .stub(mongoose.Model, "findById")
        .yields(new Error("fake")); // think actual error is replaced by this from function

      users.get(123, (err, result) => {
        expect(result).to.not.exist;
        expect(err).to.exist;
        expect(err).to.be.instanceOf(Error);
        expect(stub).to.have.been.calledWith(123);
        expect(err.message).to.equal("fake");		  // test pass
        // expect(err.message).to.equal("fakeasa");     // will show fail test as err msg above not matched

        done();
      });


```

