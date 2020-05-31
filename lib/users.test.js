const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const rewire = require("rewire");

var mongoose = require("mongoose");

var users = rewire("./users");
var User = require("./models/user");
var mailer = require("./mailer");

var sandbox = sinon.createSandbox();

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
      save: sandbox.stub().resolves(),
    };

    findStub = sandbox.stub(mongoose.Model, "findById").resolves(sampleUser);
    deleteStub = sandbox
      .stub(mongoose.Model, "remove")
      .resolves("fake_remove_result");

    mailerStub = sandbox
      .stub(mailer, "sendWelcomeEmail")
      .resolves("fake_email"); // sendWelcomeEmail = name of function returned
  });

  afterEach(() => {
    sandbox.restore(); // this equal to stub.restore();  but for sandbox version
    users = rewire("./users");
  });

  ///////////// users.get //////////////
  context("get", () => {
    it("should check for an id", (done) => {
      users.get(null, (err, result) => {
        expect(err).to.exist;
        expect(err.message).to.equal("Invalid user id"); // this err msg is exact same as in function testing
        // expect(err.message).to.equal("Invalid user idasa"); // Err msg not same as function ==> fail test
        done();
      });
    });

    it("should call findUserById with id and return result", (done) => {
      sandbox.restore();
      let stub = sandbox
        .stub(mongoose.Model, "findById")
        .yields(null, { name: "amir" });

      users.get(123, (err, result) => {
        expect(err).to.not.exist;
        expect(stub).to.have.been.calledOnce;
        expect(stub).to.have.been.calledWith(123);
        expect(result).to.be.a("object");
        expect(result).to.have.property("name").to.equal("amir");

        done();
      });
    });

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
        expect(err.message).to.equal("fake");
        // expect(err.message).to.equal("fakeasa");     // will show fail test as err msg above not matched

        done();
      });
    });
  });

  ///////////// users.delete //////////////
  context("delete user", () => {
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

    //3rd way - using async await
    it("should call User.remove", async () => {
      let result = await users.delete(123);

      expect(result).to.equal("fake_remove_result");
      expect(deleteStub).to.have.been.calledWith({ _id: 123 });
    });
  });

  ///////////// users.create //////////////
  context("create user", () => {
    let FakeUserClass, saveStub, result;

    beforeEach(async () => {
      saveStub = sandbox.stub().resolves(sampleUser);
      FakeUserClass = sandbox.stub().returns({ save: saveStub }); // save is the name of function class uses - for this rewire is used above

      users.__set__("User", FakeUserClass);
      result = await users.create(sampleUser);
    });

    // rejection tests
    it("should reject invalid args", async () => {
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

    // new should be called once
    it("should call user with new", () => {
      expect(FakeUserClass).to.have.been.calledWithNew;
      expect(FakeUserClass).to.have.been.calledWith(sampleUser);
    });

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
  });

  ///////////// users.update //////////////
  context("update user", () => {
    it("should find user by id", async () => {
      await users.update(123, { age: 35 });

      expect(findStub).to.have.been.calledWith(123);
    });

    it("should call user.save", async () => {
      await users.update(123, { age: 35 });

      expect(sampleUser.save).to.have.been.calledOnce;
    });

    it("should reject if there is an error", async () => {
      findStub.throws(new Error("fake")); // forcefully throws error to check error case

      await expect(
        users.update(123, { age: 35 })
      ).to.eventually.be.rejectedWith("fake");
    });
  });

  ///////////// reset password //////////////
  context("reset password", () => {
    let resetStub;
    beforeEach(() => {
      resetStub = sandbox
        .stub(mailer, "sendPasswordResetEmail")
        .resolves("email");
    });

    it("should check for email", async () => {
      await expect(users.resetPassword()).to.eventually.be.rejectedWith(
        "Invalid email"
      );
    });

    it("should call sendPasswordResetEmail", async () => {
      await users.resetPassword("amirengg15@gmail.com"); // testing email, export.resetPassword called
      expect(resetStub).to.have.been.calledWith("amirengg15@gmail.com"); //expected email = should be same as above
    });
  });
});
