// const app = require("../app");
// const request = require("supertest");


// describe("Test GET /api/users", () => {
//   test("it should respond with 201 success", async () => {
//     const response = await request(app)
//       .post("/register")
//       .send({
//         firstName: "Adeosun",
//         lastName: "Deji",
//         email: "adeosundeji2@gmail.com",
//         password: "password",
//         phone: "08097856398"
//       })
//       .expect("Content-Type", /json/)
//       .expect(201);

//     expect(response.statusCode).toBe(201);
//   });
// });

import chai from "chai";import chaiHttp from "chai-http";import db from "../../models/index";import server from "../../app";import { user, user2, user3 } from "./user-sign-in-test-data"; const { expect } = chai;chai.should();chai.use(chaiHttp);describe("Should test all users", async () => { describe("/api/v1/users/signin should sign in a user", () => { it("it should sign in a user with complete details successfully", done => { chai .request(server) .post("/api/v1/users/signin") .set("Accept", "application/json") .send(user) .end((err, res) => { res.should.have.status(200); res.body.should.be.a("object"); res.body.should.have.property("message").eql("User Logged in Successfully."); done(); }); }); it("it should not sign in a user with incomplete details", done => { chai .request(server) .post("/api/v1/users/signin") .set("Accept", "application/json") .send(user2) .end((err, res) => { res.should.have.status(400); done(); }); }); it("it should not sign in a user without a registered email", done => { chai .request(server) .post("/api/v1/users/signin") .set("Accept", "application/json") .send(user3) .end((err, res) => { res.should.have.status(404); res.body.should.have.property("error").eql("Email does not exist."); done(); }); }); }); describe("GET User api route", () => { let userToken; before(done => { chai .request(server) .post("/api/v1/users/signin") .set("Accept", "application/json") .send(user) .end((err, res) => { if (err) throw err; userToken = res.body.data; done(); }); }); it("returns all users", done => { chai .request(server) .get("/api/v1/users") .set("Authorization", `Bearer ${userToken}`) .end((err, res) => { const { status, body } = res; const { data } = body; expect(status).to.equal(200); expect(body.status).to.equal(200); expect(body.message).to.equal("Successfully retrived all Users"); data.forEach(users => { expect(users).to.have.property("id"); expect(users).to.have.property("username"); expect(users).to.have.property("email"); expect(users).to.have.property("password"); }); expect(data).to.be.an("array"); done(); }); }); });