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

    hash = utils.getHash("hashtest");
  });

  afterEach(() => {
    sandbox.restore();
  });

  // rejection case test
  it("should return null if invalid string is passed", () => {
    sandbox.reset(); // sometimes sandbox.restore() do not work use reset

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
