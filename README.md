# Node-JS-Unit-Testing
Unit testing in Node Application using Mocha, Chai, Chai-as-promised, Stubs, Sinon, Rewire, Test Driven Development, Test Coverage with Istanbul/NYC.

Please leave a star if it was helpful.

## Installation
npm install mocha -g    (Node's Unit Testing library)<br>
npm install chai    (Assertion library)<br>
npm install cross-env   (Handle Environment variables)<br>
npm i chai-as-promised (Handle promises in lesser codes)<br>
npm i supertest    (Handle routes in unit testing) <br>

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


### H a. Users.get()  (Fecthing Operation - MongoDB)

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

Catch error if there is one

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

### H b. Users.delete()  (Delete Operation - MongoDB)

    users.js

    ```
    exports.delete = function (id) {
        // return Promise.resolve()
        if (!id) {
            return Promise.reject(new Error('Invalid id'));
        }

        return User.remove({
            _id: id
        });
    }

    ```

    users.test.js

    ```
    context("delete user", () => {

        // 1st way of writing shorter test
        it("should check for an id using return", () => {
            return users
                .delete()
                .then((result) => {
                throw new Error("unexpected success");
                })
                .catch((ex) => {
                expect(ex).to.be.instanceOf(Error);
                expect(ex.message).to.equal("Invalid id");
                });
            });

            // 2nd way of writing shorter test - sinonChai plugin
            it("should check for an error using eventually", () => {
            return expect(users.delete()).to.eventually.be.rejectedWith("Invalid id");
            });
    });

    ```

    ### H c. Users.create()  (Delete Operation - MongoDB)

    Eg 1 <br>

    ```
    const rewire = require("rewire");

    var mongoose = require("mongoose");

    var users = rewire("./users");
    var User = require("./models/user");
    var mailer = require("./mailer");

    describe("users", () => {
    let findStub;
    let deleteStub;
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

        findStub = sandbox.stub(mongoose.Model, "findById").resolves(sampleUser);
        deleteStub = sandbox
        .stub(mongoose.Model, "remove")
        .resolves("fake_remove_result");

        mailerStub = sandbox
        .stub(mailer, "sendWelcomeEmail")
        .resolves("fake_email");
    });

    afterEach(() => {
        sandbox.restore(); // this equal to stub.restore();  but for sandbox version
        users = rewire("./users");
    });

    context("create user", () => {
        let FakeUserClass, saveStub, result;

        beforeEach(async () => {
        saveStub = sandbox.stub().resolves(sampleUser);		// creating stub
        FakeUserClass = sandbox.stub().returns({ save: saveStub }); // save is the name of function class uses - for this rewire is used above

        users.__set__("User", FakeUserClass);
        result = await users.create(sampleUser);		// TEST SAVE PASS CASE
        });

        it("should reject invalid args", async () => {	// TEST SAVE ERROR CASES
        await expect(users.create()).to.eventually.be.rejectedWith(
            "Invalid arguments"
        );

        await expect(
            users.create({ name: "amir" })
        ).to.eventually.be.rejectedWith("Invalid arguments");

        await expect(
            users.create({ email: "amirengg15@gmail.com" })
        ).to.eventually.be.rejectedWith("Invalid arguments");
        });

        it("should call user with new", () => {	// TEST FOR CORRECT OBJECT CALLED
        expect(FakeUserClass).to.have.been.calledWithNew;
        expect(FakeUserClass).to.have.been.calledWith(sampleUser);
        });
    });
    });

    ```

    Eg 2 <br>

    ```
    it("should save the user", () => {
        expect(saveStub).to.have.been.called;
        });

        it("should call mailer with email and name", () => {
        expect(mailerStub).to.have.been.calledWith(
            sampleUser.email,
            sampleUser.name
        ); // these parameter is expected in
            });

            it("should reject errors", async () => {
            saveStub.rejects(new Error("fake"));

            await expect(users.create(sampleUser)).to.eventually.be.rejectedWith(
                "fake"
            );
            });

    ```


### H d. Users.update()  (Delete Operation - MongoDB)

users.js

```
exports.update = async function (id, data) {
  try {
    var user = await User.findById(id); // Write test for this

    for (var prop in data) {
      user[prop] = data[prop];
    }

    var result = await user.save(); // write test for this

    return result;
  } catch (err) {
    // console.warn(err);
    return Promise.reject(err); // one test for rejection
  }
};

```

users.test.js

```
///////////// users.update //////////////
  context("update user", () => {
    it("should find user by id", async () => {
      await users.update(123, { age: 35 });

      expect(findStub).to.have.been.calledWith(123);		// find stub called
    });

    it("should call user.save", async () => {
      await users.update(123, { age: 35 });

      expect(sampleUser.save).to.have.been.calledOnce;	// sampleUser.save called
    });

    it("should reject if there is an error", async () => {
      findStub.throws(new Error("fake")); // forcefully throws error to check error case

      await expect(
        users.update(123, { age: 35 })
      ).to.eventually.be.rejectedWith("fakeasa");
    });
  });

```

### I. Reset Password  (MongoDB)

users.js

```
exports.resetPassword = function (email) {
  if (!email) {
    return Promise.reject(new Error("Invalid email")); // write test for this
  }

  //some operations

  return mailer.sendPasswordResetEmail(email); // write test for this
};

```

users.test.js

```
///////////// reset password //////////////
  context("reset password", () => {
    let resetStub;
    beforeEach(() => {
      resetStub = sandbox.stub(mailer, "sendPasswordResetEmail").resolves("email");
    });

    it("should check for email", async () => {
      await expect(users.resetPassword()).to.eventually.be.rejectedWith(
        "Invalid email"
      );	// no arguments passed inside resetPassword() , therefore error
    });

    it("should call sendPasswordResetEmail", async () => {
      await users.resetPassword("amirengg15@gmail.com"); // testing email, export.resetPassword called
      expect(resetStub).to.have.been.calledWith("amirengg15@gmail.com"); //expected email = should be same as above
    });
  });

```

Run - mocha users.test.js

### J. Mailer

Eg 1 - function 1

mailer.js

```
exports.sendWelcomeEmail = function (email, name) {
  // console.log('--- in mailer > sendWelcomeEmail');
  if (!email || !name) {
    return Promise.reject(new Error("Invalid input")); // write test for this
  }

  var body = `Dear ${name}, welcome to our family!`; //write test for this

  return sendEmail(email, body);
};

```

mailer.test.js

```
const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const rewire = require("rewire");

var sandbox = sinon.sandbox.create();
var mailer = rewire("./mailer");

describe("mailer", () => {
  let emailStub;

  beforeEach(() => {
    emailStub = sandbox.stub().resolves("done");
    mailer.__set__("sendEmail", emailStub);
  });

  afterEach(() => {
    sandbox.restore();		
    mailer = rewire("./mailer");   // mandatory test
  });

  ///////////// Send Welcome Email //////////////

  context("sendWelcomeEmail", () => {
    // rejected mail test
    it("should check for email and name", async () => {
      await expect(mailer.sendWelcomeEmail()).to.eventually.be.rejectedWith(
        "Invalid input"
      );

      await expect(
        mailer.sendWelcomeEmail("amirengg15@gmail.com")
      ).to.eventually.be.rejectedWith("Invalid input");	// Expects two parameters
    });

    // return with email and password test
    it("should call sendEmail with email and password", async () => {
      mailer.sendWelcomeEmail("amirengg15@gmail.com", "Amir");

      expect(emailStub).to.have.been.calledWith(
        "amirengg15@gmail.com",
        "Dear Amir, welcome to our family!"		// Return message from mailer.js
      );
    });
  });
});

```

Eg2 - Test reset email - function 2

mailer.js

```
exports.sendPasswordResetEmail = function (email) {
  // console.log('--- in mailer > sendPasswordResetEmail');
  if (!email) {
    return Promise.reject(new Error("Invalid input"));
  }

  var body = "Please click http://some_link to reset your password.";

  return sendEmail(email, body);
};

```

mailer.test.js

```
///////////// Send Password Reset Email //////////////

  context("sendPasswordResetEmail", () => {
    // rejected mail test
    it("should check for email", async () => {
      await expect(
        mailer.sendPasswordResetEmail()	// empty email send – throw error
      ).to.eventually.be.rejectedWith("Invalid input");		// from sinon chai
    });

    // return with email and password test
    it("should call sendEmail with email and password", async () => {
      mailer.sendPasswordResetEmail("amirengg15@gmail.com");

      expect(emailStub).to.have.been.calledWith(
        "amirengg15@gmail.com",
        "Please click http://some_link to reset your password."
      );
    });
  });

```

Eg 3 - sendMail function - private function (this is the private function as no export is written – using reqire __get__)

```
function sendEmail(email, body) {
  // console.log('--- in mailer > sendEmail');
  if (!email || !body) {
    return Promise.reject(new Error("Invalid input")); // write test for this
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Email Sent!");
      // return reject(new Error('Fake Error'));
      return resolve("Email sent"); // write test for this
    }, 100);
  });
}

```

mailer.test.js

```
///////////// Send Email //////////////

  context("sendEmail", () => {
    let sendEmail;

    beforeEach(() => {
      mailer = rewire("./mailer");
      sendEmail = mailer.__get__("sendEmail"); // we are rewiring it because this is the private function
    });

    // Test 1
    it("should check for email and body", async () => {
      await expect(sendEmail()).to.eventually.be.rejectedWith("Invalid input");
      await expect(
        sendEmail("amirengg15@gmail.com")
      ).to.eventually.be.rejectedWith("Invalid input");
    });

    // Test 2
    it("should should call sendEmail with email and password", async () => {
      // stub actual mailer
      let result = await sendEmail("amirengg15@gmail.com", "welcome");
      expect(result).to.equal("Email sent");
    });
  });

```

### K. utils

utils.js

```
const crypto = require("crypto");

const config = require("./config");

//foo = 1f0c01e25707f55ed3014d60bd0d0373
exports.getHash = function (string) {
  if (!string || typeof string !== "string") return null; // write test for this

  string += "_" + config.secret(); // write test to get secret

  var hash = crypto.createHash("md5").update(string).digest("hex");  // write test for this 
      								   // chain individually
  // console.log('Hash: ' , hash);

  return hash; // write test to get hash
};

```

utils.test.js

```
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var crypto = require("crypto");

var config = require("./config");
var utils = require("./utils");

var sandbox = sinon.sandbox.create();

describe("utils", () => {
  let secretStub, digestStub, updateStub, createHashStub, hash;

  beforeEach(() => {
    secretStub = sandbox.stub(config, "secret").returns("fake_secret");
    digestStub = sandbox.stub().returns("ABC123");

    updateStub = sandbox.stub().returns({
      digest: digestStub,
    });

    createHashStub = sandbox.stub(crypto, "createHash").returns({
      update: updateStub,
    });

    hash = utils.getHash("hashtest");		// can be any name , just below append in test result
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should return null if invalid string is passed", () => {
    sandbox.reset(); // sometimes sandbox.restore() do not work use reset

    // rejection case test
    let hash2 = utils.getHash(null);
    let hash3 = utils.getHash(123);
    let hash4 = utils.getHash({ name: "bar" });

    expect(hash2).to.be.null;
    expect(hash3).to.be.null;
    expect(hash4).to.be.null;

    expect(createHashStub).to.not.have.been.called;
  });

  // test to get secret key from config
  it("should get secret from config", () => {
    expect(secretStub).to.have.been.calledOnce;
  });

  // test to get correct hash
  it("should call crypto with correct settings abd return hash", () => {
    expect(createHashStub).to.have.been.calledWith("md5");
    expect(updateStub).to.have.been.calledWith("hashtest_fake_secret");
    expect(digestStub).to.have.been.calledWith("hex");
    expect(hash).to.equal("ABC123");
  });
});


```

### L Routes

--> For handeling routes in Node, we use package called supertest <br/>

npm i supertest

### L > A. GET / Route

app.js

```
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const db = require('../config/database');
const users = require('./users');
const auth = require('./auth');

mongoose.connect(db());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//--------------------------------------> routes
app.get('/', (req, res) => {
    res.status(200).json({
        name: 'Foo Fooing Bar'
    });
});

```

app.test.js

```
const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const rewire = require("rewire");
const request = require("supertest");     // Mandatory library for routing - Supertest

var app = rewire("./app");
var users = require("./users");
var auth = require("./auth");
var sandbox = sinon.sandbox.create();		// Create Sandbox

describe("app", () => {
  afterEach(() => {
    app = rewire("./app");
    sandbox.restore();			// basic for working with sinon/stubs properly
  });

  context("GET /", () =>{
      it("should get /", (done) =>{
        request(app).get("/")			// functionality provided by supertest
            .expect(200)
            .end((err, response) =>{
                expect(response.body).to.have.property("name").to.equal("Foo Fooing Bar");
                done(err);
            })
      })
  });
});

```

Run - mocha app.test.js --exit (exit flag is required otherwise, it will go on testing without stopping)

### L > B. POST / Route

app.js

```
app.post('/user', function (req, res) {
    users.create(req.body).then((result) => {   // write test for this
        res.json(result);
    }).catch((err) => {
        handleError(res, err);	// write test for this
    });
});

```

app.test.js

```
 ////////// Route 2 Test - POST / ///////////////////
  context("POST /user", () =>{
      let createStub, errorStub;
      it("should call user.create", (done) =>{
      
      // think this to be returned from actual function
        createStub = sandbox.stub(users, "create").resolves({name: "foo"}); 
        
        request(app).post("/user")
            .send({name: "fake"})   // way to send data in post route
            .expect(200)
            .end((err, response) => {
                expect(createStub).to.have.been.calledOnce;
                expect(response.body).to.have.property("name").to.equal("foo"); // should match line 38
                done(err);
            })
      })
  });

```

Eg 2 -

```
// test for handeling err

      it("should call handleError on error", (done) =>{
        createStub = sandbox.stub(users, "create").rejects(new Error("fake error"));

        errorStub = sandbox.stub().callsFake((res, err) => {
          return res.status(400).json({error: "fake"}); // Stubbed o/p
        });

        app.__set__("handleError", errorStub);

        request(app).post("/user")
          .send({ name: "fake" })
          .expect(400)
          .end((error, response) => {
            expect(createStub).to.have.been.calledOnce;
            expect(errorStub).to.have.been.calledOnce;
            expect(response.body).to.have.property("error").to.equal("fake");   // must be same as line 54
            done(error);
          });
      });


```

Run - mocha app.test.js --exit


### L > C. DELETE / Route

Auth.js (middleware)

```
exports.isAuthorized = function (req, res, next) {
    if (req.headers.authorization === 'foo') {
        return next()
    }

    return res.json({
        error: 'Unauthorized'
    });
}

```

app.js (route to test)

```
app.delete('/user/:id', auth.isAuthorized, function (req, res) {
    users.delete({id: req.params.id, name: 'foo'}).then((result) => {
        res.json(result);
    }).catch((err) => {
        handleError(res, err);
    });
});

```

app.test.js

```
context("DELETE /user/:id", () =>{
    let authStub, deleteStub;

    beforeEach(() => {
      fakeAuth = (req, res, next) => {
        return next();
      }

      authStub = sandbox.stub(auth, "isAuthorized").callsFake(fakeAuth);	// WAY TO STUB MIDDLEWARE

      app = rewire("./app");
    });

    it("should call auth check function and users.delete on success", (done) => {
      deleteStub = sandbox.stub(users, 'delete').resolves("fake_delete");  // stubbed original and expect fake_delete

      request(app).delete("/user/123")   // Passing the ID here
        .expect(200)
        .end((err, response) => {
          expect(authStub).to.have.been.calledOnce;
          expect(deleteStub).to.have.been.calledWithMatch({id: "123"}); // callWithMatch matches property in obj data
          expect(response.body).to.equal("fake_delete");
          done(err);
        })
    });

  });

```

### M Way to test model

user.js
path - Model/user.js

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

user.test.js
path - model/user.test.js

```
const chai = require("chai");
const expect = chai.expect;

var User = require("./user");		// model included

describe("User model", () => {
    it("should return error in required areas are missing", (done) => { // when name or email field is missing
        let user = new User();			 // err as no data obj passed

        user.validate((err) => {                    // this is mongodb default functions
            expect(err.errors.name).to.exist;
            expect(err.errors.email).to.exist;
            expect(err.errors.age).to.not.exist;    // optional field

            done();

        });
    })
});

```

Eg2 - user.test.js

```
it("should have optional age field", (done) => {
        let user = new User({
            name: "foo",
            email: "foo@gmail.com",
            age: 27
        });

        expect(user).to.have.property("age").to.equal(27);
        done();
});

```

### N. Way to test Classes

order.js  (Class to test)

```
class Order {
    constructor(ref, user, items) {
        this.ref = ref;
        this.user = user;
        this.items = items;
        this.status = 'Pending';
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
        this.subtotal = 0;

        for (let item of items) {
            // console.log(item)
            this.subtotal += item.price
        }

        if (this.subtotal <= 50) {
            this.shipping = 5;
        } else {
            this.shipping = 10;
        }

        this.total = this.subtotal + this.shipping;
    }

    save() {
        //..some logic..

        this.status = 'Active';
        this.updatedAt = Date.now();

        let o = {
            ref: this.ref,
            user: this.user.name,
            updatedAt: this.updatedAt,
            status: this.status,
            items: this.items,
            shipping: this.shipping,
            total: this.total,
        }

        return o;
    }

    cancel() {
        //...some logic...

        this.status = 'Cancelled';
        this.updatedAt = Date.now();
        this.shipping = 0;
        this.total = 0;

        console.warn('Order cancelled');

        return true;
    }
}

Order.prototype.ship = function () {
    this.status = 'Shipped';
    this.updatedAt = Date.now();
}

module.exports = Order;

```

order.test.js

```
class Order {
    constructor(ref, user, items) {
        this.ref = ref;
        this.user = user;
        this.items = items;
        this.status = 'Pending';
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
        this.subtotal = 0;

        for (let item of items) {
            // console.log(item)
            this.subtotal += item.price
        }

        if (this.subtotal <= 50) {
            this.shipping = 5;
        } else {
            this.shipping = 10;
        }

        this.total = this.subtotal + this.shipping;
    }

    save() {
        //..some logic..

        this.status = 'Active';
        this.updatedAt = Date.now();

        let o = {
            ref: this.ref,
            user: this.user.name,
            updatedAt: this.updatedAt,
            status: this.status,
            items: this.items,
            shipping: this.shipping,
            total: this.total,
        }

        return o;
    }

    cancel() {
        //...some logic...

        this.status = 'Cancelled';
        this.updatedAt = Date.now();
        this.shipping = 0;
        this.total = 0;

        console.warn('Order cancelled');

        return true;
    }
}

Order.prototype.ship = function () {
    this.status = 'Shipped';
    this.updatedAt = Date.now();
}

module.exports = Order;

```

order.test.js

```
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

var Order = require("./order");
var sandbox = sinon.sandbox.create();

describe("order", () => {
    let warnStub, dateSpy, user, items, o;

    beforeEach(() => {
        warnStub = sandbox.stub(console, "warn");
        dateSpy = sandbox.spy(Date, 'now');

        user = { id: 1, name: "foo" };

        items = [
            { name: "Book", price: 10 },
            { name: "Dice set", price: 5 }
        ];

        o = new Order(123, user, items);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("should create instance or Order and calculate total + shipping", () => {
        expect(o).to.be.instanceOf(Order);
        expect(dateSpy).to.have.been.calledTwice;
        expect(o).to.have.property("ref").to.equal(123);// these tests are written as per 
        expect(o).to.have.property("user").to.deep.equal(user);	// Way to check property
        expect(o).to.have.property("items").to.deep.equal(items);
        expect(o).to.have.property("status").to.equal("Pending");
        expect(o).to.have.property("createdAt").to.be.a("Number");
        expect(o).to.have.property("updatedAt").to.be.a("Number");
        expect(o).to.have.property("subtotal").to.equal(15);
        expect(o).to.have.property("shipping").to.equal(5);
        expect(o).to.have.property("total").to.equal(20);

        expect(o.save).to.be.a("function");
        expect(o.cancel).to.be.a("function");
        expect(o.ship).to.be.a("function");

    })
});

```

Eg2 - Testing save() function

order.test.js

```
save() {
        //..some logic..

        this.status = 'Active';
        this.updatedAt = Date.now();

        let o = {
            ref: this.ref,
            user: this.user.name,
            updatedAt: this.updatedAt,
            status: this.status,
            items: this.items,
            shipping: this.shipping,
            total: this.total,
        }

        return o;
    }

```

order.test.js

```
it("should update the status to 'Active' and return order details", () =>{
        let result = o.save();

        expect(dateSpy).to.have.been.calledThrice;  // thrice because, it is already called twice in constructor
        expect(o.status).to.equal("Active");
        expect(result).to.be.a("object");
        expect(result).to.have.property("user").to.equal("foo");
        expect(result).to.have.property("updatedAt").to.be.a("Number")

        // check rest of the props
})

```

Eg3 - Testing cancel() function

order.js

```
cancel() {
        //...some logic...

        this.status = 'Cancelled';
        this.updatedAt = Date.now();
        this.shipping = 0;
        this.total = 0;

        console.warn('Order cancelled');

        return true;
    }

```

order.test.js

```
it("should cancel an order, updated status and set shipping and total to zero", () => {
        let result = o.cancel();
        
        expect(warnStub).to.have.been.calledWith("Order cancelled");
        expect(dateSpy).to.have.been.calledThrice;
        expect(o.status).to.equal("Cancelled");  
        expect(result).to.be.true;
        expect(o.shipping).to.equal(0);
        expect(o.total).to.equal(0);
})

```

Eg4 - Prototype Method

order.js
```
Order.prototype.ship = function () {
    this.status = 'Shipped';
    this.updatedAt = Date.now();
}

```

order.test.js

```
it("should update status to shipped 'prototyope method'", () => {
        o.ship();

        expect(o.status).is.equal("Shipped");
        expect(dateSpy).to.have.been.calledThrice;
});

```
--> So now we know to how to unit testing for class works, so if anybody changes class, unit testing will fail and we know before hand.


### O. Test Coverage with Istanbul / NYC

i. npm i nyc --save-dev

ii. Now to track all the test in the app, ration it is tested or pending tests can be done with nyc

Open your package.json file - Add coverage command

```
"scripts": {
    "test": "cross-env NODE_ENV=development mocha \"./{,!(node_modules)/**/}*.test.js\" --exit",
    "test2": "mocha \"./tests/**/*.js\" --recursive",
    "coverage": "cross-env NODE_ENV=development nyc --reporter=text npm test"
  },
```

Run - npm run coverage

iii. in test command we have skipped node_modules directory
