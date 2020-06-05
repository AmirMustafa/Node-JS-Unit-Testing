const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const rewire = require("rewire");
const request = require("supertest");

var app = rewire("./app");
var users = require("./users");
var auth = require("./auth");
var sandbox = sinon.sandbox.create();

describe("app", () => {
  afterEach(() => {
    app = rewire("./app");
    sandbox.restore();
  });

  ////////// Route 1 Test - GET / ///////////////////
  context("GET /", () =>{
      it("should get /", (done) =>{
        request(app).get("/")
            .expect(200)
            .end((err, response) =>{            // super test provides node like callback for testing
                expect(response.body).to.have.property("name").to.equal("Foo Fooing Bar");
                done(err);
            })
      })
  });

  ////////// Route 2 Test - POST / ///////////////////
  context("POST /user", () =>{
      let createStub, errorStub;
      it("should call user.create", (done) =>{
        createStub = sandbox.stub(users, "create").resolves({name: "foo"}); // think this to be returned from actual function

        request(app).post("/user")
            .send({name: "fake"})   // way to send data in post route - if route in app.js expected this, will not throw this err
            .expect(200)
            .end((err, response) => {
                expect(createStub).to.have.been.calledOnce;
                expect(response.body).to.have.property("name").to.equal("foo"); // should match line 38
                done(err);
            })
      })

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
  });

  context("DELETE /user/:id", () =>{
    let authStub, deleteStub;

    beforeEach(() => {
      fakeAuth = (req, res, next) => {
        return next();
      }

      authStub = sandbox.stub(auth, "isAuthorized").callsFake(fakeAuth);

      app = rewire("./app");
    });

    it("should call auth check function and users.delete on success", (done) => {
      deleteStub = sandbox.stub(users, 'delete').resolves("fake_delete");  // stubbed original and expect fake_delete

      request(app).delete("/user/123")
        .expect(200)
        .end((err, response) => {
          expect(authStub).to.have.been.calledOnce;
          expect(deleteStub).to.have.been.calledWithMatch({id: "123"}); // callWithMatch matches property in obj data
          expect(response.body).to.equal("fake_delete");
          done(err);
        })
    });


  });

  context("handleError", () => {
    let handleError, res, statusStub, jsonStub;

    beforeEach(() => {
      jsonStub = sandbox.stub().returns("done");
      statusStub = sandbox.stub().returns({
        json: jsonStub
      });

      res = {
        status: statusStub
      }

      handleError = app.__get__("handleError");   // this get functionality is from rewire
    });

    it("should check error instance and format message", (done) => {
      let result = handleError(res, new Error("fake"));

      expect(statusStub).to.have.been.calledWith(400);
      expect(jsonStub).to.have.been.calledWith({
        error: "fake"
      });

      done();
    })

    it("should return object without changing it if not instance of error", (done) => {
      let result = handleError(res, {id: 1, message: "fake error"});

      expect(statusStub).to.have.been.calledWith(400);
      expect(jsonStub).to.have.been.calledWith({id: 1, message: "fake error"});
      done();
    });
  })
});
