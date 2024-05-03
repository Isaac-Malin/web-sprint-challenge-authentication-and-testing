// Write your tests here
const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");
const bcrypt = require("bcryptjs");
// test('sanity', () => {
//   expect(true).toBe(1)
// })

beforeEach(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
// beforeEach(async () => {
//   await db.seed.run()
// })

describe("[POST] /api/auth/register", () => {
  test("adds new user to the data base", async () => {
    const user = { username: "Brooke", password: bcrypt.hashSync("1234", 8) };
    await request(server).post("/api/auth/register").send(user);
    expect(await db("users")).toHaveLength(1);
  });
  test("Responds with the newly created user", async () => {
    const user = { username: "Isaac", password: bcrypt.hashSync("1234", 8) };
    const res = await request(server).post("/api/auth/register").send(user);
    expect(res.body).toMatchObject({ username: "Isaac" });
  });
});

describe("POST /api/auth/login", () => {
  test("Responds with a welcome message and token on successful login", async () => {
    // Create a user with a hashed password
    const hashedPassword = bcrypt.hashSync("password", 8);
    const user = { username: "isaac", password: hashedPassword };

    // Register the user or add to the database before testing the login
    await request(server).post("/api/auth/register").send(user);

    // Send a login request with the user credentials
    const response = await request(server).post("/api/auth/login").send(user);

    expect(response.body).toHaveProperty('message', 'welcome, isaac')
    expect(response.body).toHaveProperty('token')
  });
  test('Response with status code OK 200', async () => {
    const hashedPassword = bcrypt.hashSync("password", 8);
    const user = { username: "isaac", password: hashedPassword };

    await request(server).post("/api/auth/register").send(user);

    // Send a login request with the user credentials
    const response = await request(server).post("/api/auth/login").send(user);
    expect(response.status).toBe(200)
  })
});
