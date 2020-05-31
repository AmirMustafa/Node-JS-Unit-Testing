const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const rewire = require("rewire");

var demo = rewire("./demo");

describe("demo", () => {
  context("add", () => {
    it("should add two numbers", () => {
      expect(demo.add(1, 2)).to.equal(3);
    });
  });

  context("callback add", () => {
    it("should test the callback", (done) => {
      demo.addCallback(1, 2, (err, result) => {
        expect(err).to.not.exist;
        expect(result).to.equal(3);
        done(); // must for callback
      });
    });
  });

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

    it("should test promise with async await", async () => {
      let result = await demo.addPromise(1, 2);
      expect(result).to.equal(3);
    });

    it("should test promise with chai-as-promised", async () => {
      await expect(demo.addPromise(1, 2)).to.eventually.equal(3);
    });
  });

  context("test doubles", () => {
    it("should spy on log", () => {
      let spy = sinon.spy(console, "log");
      demo.foo();

      expect(spy.calledOnce).to.be.true; // way 1 using sinon
      expect(spy).to.have.been.calledOnce; // way 2 using sinon-chai, (both are same)
      spy.restore();
    });

    it("should stub console warn", () => {
      let stub = sinon.stub(console, "warn").callsFake(() => {
        console.log("message from stub");
      });
      demo.foo();
      expect(stub).to.have.been.calledOnce;
      expect(stub).to.have.been.calledWith("console.warn was called"); // 2 should not be there
      stub.restore();
    });
  });

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
});
