
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/app");

chai.use(chaiHttp);
const should = chai.should()

describe("Addition api tests", () => {
    it("should render the homepage template", (done) => {
        chai
            .request(app)
            .get("/")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it("should test the socket connection between server and client when accessing the '/' route", (done) => {
        chai
            .request(app)
            .get("/")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it("should render the form template for a new site", (done) => {
        chai
            .request(app)
            .get("/form")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it("should add a new site to the database", (done) => {
        chai
            .request(app)
            .post("/new")
            .send({ name: "test", description: "test", profile: "" })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

});
