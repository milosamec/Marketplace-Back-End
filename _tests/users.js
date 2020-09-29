const supertest = require("supertest");
const app = require("../server");

describe("Users integration test", () => {
  it("should register a user", async () => {
    const res = await supertest(app).post("/api/v1/users/register").send({
      username: "pedro",
      password: "123456",
    });
    expect(res.statusCode).toBe(201);
    // .catch((err) => console.log(err));
  });

  let token;
  it("Should login user", async () => {
    const res = await supertest(app).post("/api/v1/users/login").send({
      username: "pedro",
      password: "123456",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token);
    token = res.body.token;
  });
});
