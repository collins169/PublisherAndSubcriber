const chai = require("chai");
const { expect } = chai;
const request = require("supertest");
const app = require("../app.js");
const fs = require("fs");
describe("Publisher and Subscriber Test", () => {
    
  //Let delete the test database json file
  after(function () {
    fs.unlinkSync("db/pangaeadb-test.js");
  });

  //Run test to check subscription to a topic
  it("should subscribe to a topic", async () => {
    const res = await request(app)
      .post("/subscribe/topic1")
      .set({ "Content-Type": "application/json" })
      .send({
        url: "http://localhost:5001/test1",
      });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("url");
    expect(res.body).to.have.property("topic");
  });

  //Run test to publish to a topic
  it("should publish to a topic", async () => {
    const res = await request(app)
      .post("/publish/topic1")
      .set({ "Content-Type": "application/json" })
      .send({
        message: "tetstsg",
      });
    expect(res.status).to.equal(201);
  });
});
