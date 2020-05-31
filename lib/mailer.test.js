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

  ///////////// Send Welcome Email //////////////
  context("sendWelcomeEmail", () => {
    // rejected mail test
    it("should check for email and name", async () => {
      await expect(mailer.sendWelcomeEmail()).to.eventually.be.rejectedWith(
        "Invalid input"
      );

      await expect(
        mailer.sendWelcomeEmail("amirengg15@gmail.com")
      ).to.eventually.be.rejectedWith("Invalid input");
    });

    // return with email and password test
    it("should call sendEmail with email and password", async () => {
      mailer.sendWelcomeEmail("amirengg15@gmail.com", "Amir");

      expect(emailStub).to.have.been.calledWith(
        "amirengg15@gmail.com",
        "Dear Amir, welcome to our family!"
      );
    });
  });

  ///////////// Send Password Reset Email //////////////
  context("sendPasswordResetEmail", () => {
    // rejected mail test
    it("should check for email", async () => {
      await expect(
        mailer.sendPasswordResetEmail()
      ).to.eventually.be.rejectedWith("Invalid input");
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
});
