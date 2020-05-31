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
    mailer = rewire("./mailer");
  });

  context("sendWelcomeEmail", () => {
    it("should check for email and name", async () => {
      await expect(mailer.sendWelcomeEmail()).to.eventually.be.rejectedWith(
        "Invalid input"
      );

      await expect(
        mailer.sendWelcomeEmail("amirengg15@gmail.com")
      ).to.eventually.be.rejectedWith("Invalid input");
    });

    it("should call sendEmail with email and password", async () => {
      mailer.sendWelcomeEmail("amirengg15@gmail.com", "Amir");

      expect(emailStub).to.have.been.calledWith(
        "amirengg15@gmail.com",
        "Dear Amir, welcome to our family!"
      );
    });
  });
});
