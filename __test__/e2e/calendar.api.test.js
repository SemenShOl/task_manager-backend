const request = require("supertest");
const app = require("../../index");

describe("/calendar", () => {
  beforeAll(async () => {
    await request(app).delete("/__test__");
  });
  it("create task", async () => {
    const data = {
      title: "CCCP",
      description: "la",
      deadline: "2024-01-27",
      priority: "C",
      userID: 1,
    };
    await request(app).post("/calendar").send(data).expect(201);
    const response = await request(app).get("/calendar/2024-01-27");
    expect(response.body).toEqual([
      {
        id: expect.any(String),
        user_id: expect.any(String),
        date_of_creation: expect.any(String),
        status: expect.any(Boolean),
        title: "CCCP",
        description: "la",
        deadline: "2024-01-27",
        priority: "C",
        userID: 1,
      },
    ]);
  });
});
