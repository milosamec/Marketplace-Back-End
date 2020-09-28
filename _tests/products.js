const supertest = require("supertest");
const app = require("../server");

describe("Product CRUD test", () => {
  let product;
  it("GET all products", async () => {
    const res = await supertest(app).get("/api/v1/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.data);
    product = res.body.data[0];
    expect(product.title).toBe("Postman Barbell");
  });

  let token;
  it("Should login user", async () => {
    const res = await supertest(app).post("/api/v1/users/login").send({
      username: "milooooo",
      password: "123456",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token);
    token = res.body.token;
  });

  it("Should add product with token", async () => {
    const res = await supertest(app)
      .post("/api/v1/products")
      .set("Content-Type", "application/json")
      .set("Authorization", token)
      .send({
        title: "Miloooos Soap",
        description: "Moisturizing soap",
        price: "22",
        image: "randomimage.jpg",
      });
    expect(res.statusCode).toBe(200);
    product = res.body.data;
  });

  it("It Should update product if user is the owner", async () => {
    const res = await supertest(app)
      .put(`/api/v1/products/${product.id}`)
      .set("Content-Type", "application/json")
      .set("Authorization", token)
      .send({
        title: "Miloooos Soapee",
        description: "Moisturizing soap",
        price: "22",
        image: "na",
      });
    expect(res.statusCode).toBe(200);
  });

  it("It Should delete product if user is the owner", async () => {
    const res = await supertest(app)
      .delete(`/api/v1/products/${product.id}`)
      .set("Authorization", token);
    expect(res.statusCode).toBe(200);
  });
});
