import express from "express";
import {pool} from "./utilis/db.mjs";

const app = express();
const port = 4000;

app.use(express.json());

// app.get("/test", (req, res) => {
//   return res.json("Server API is working ⭐️");
// });

app.get("/movies", async (req, res) => {
  const result = await pool.query("select * from movies");

  return res.json({
    data: result.rows,
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
