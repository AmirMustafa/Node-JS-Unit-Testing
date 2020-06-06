const chai = require("chai");
const expect = chai.expect;

let user = require("./user");
describe("user", () => {
    context("getFullAddress", () => {
        it("should return full address", ()=>{
            let result = user.getFullAddress({
                street: "100 Select City Walk, Malviyanagar",
                city: "New Delhi",
                province: "IN",
                postal: "110017"
            });

            expect(result).to.equal("100 Select City Walk, Malviyanagar, New Delhi IN, 110017");
        });

        it("should return full address", ()=>{
            let result = user.getFullAddress({
                street: "200 Select City Walk, Malviyanagar",
                city: "New Delhi",
                province: "IN",
                postal: "110017"
            });

            expect(result).to.equal("200 Select City Walk, Malviyanagar, New Delhi IN, 110017");
        });

        it("should return an error", () => {
            let result = user.getFullAddress({
                street: null,
                city: "New Delhi",
                province: "IN",
                postal: "110017"
            });

            expect(result).to.equal("Invalid user");
        })
    });
});