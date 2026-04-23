const { createClient } = require("redis");

const client = createClient({
  url: "redis://127.0.0.1:6379",
});

client.on("connect", () => {
  console.log("Redis connected ✅");
});

client.on("error", (err) => {
  console.log("Redis error ❌", err);
});

client.connect();

module.exports = client;