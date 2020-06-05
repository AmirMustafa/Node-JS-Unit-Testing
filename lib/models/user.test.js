const chai = require("chai");
const expect = chai.expect;

var User = require("./user");

describe("User model", () => {
    it("should return error in required areas are missing", (done) => { // when name or email field is missing
        let user = new User();

        user.validate((err) => {                    // this is mongodb default functions
            expect(err.errors.name).to.exist;
            expect(err.errors.email).to.exist;
            expect(err.errors.age).to.not.exist;    // optional field

            done();

        });
    })

    it("should have optional age field", (done) => {
        let user = new User({
            name: "foo",
            email: "foo@gmail.com",
            age: 27
        });

        expect(user).to.have.property("age").to.equal(27);
        done();
    });
});