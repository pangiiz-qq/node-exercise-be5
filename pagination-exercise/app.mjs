import express from "express";
import {pool} from "./db.mjs";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/movies", async (req, res) => {
  try {
    // แก้ไขโค้ดเพื่อทำ Pagination ได้ข้างล่างนี้ 🔽🔽🔽
    const genres = req.query.genres;
    const keywords = req.query.keywords;
    const page = req.query.page || 1;
    const PAGE_SIZE = 5;
    const offset = (page - 1) * PAGE_SIZE;

    let query = "select * from movies";
    let values = [];

    if (keywords && genres) {
      query += " where genres ilike $1 and title ilike $2 limit $3 offset $4";
      values = [`%${genres}%`, `%${keywords}%`, PAGE_SIZE, offset];
    } else if (keywords) {
      query += " where title ilike $1 limit $2 offset $3";
      values = [`%${keywords}%`, PAGE_SIZE, offset];
    } else if (genres) {
      query += " where genres ilike $1 limit $2 offset $3";
      values = [`%${genres}%`, PAGE_SIZE, offset];
    } else {
      query += " limit $1 offset $2";
      values = [PAGE_SIZE, offset];
    }
    // แก้ไขโค้ดเพื่อทำ Pagination ได้ข้างบนนี้ 🔼🔼🔼

    const result = await pool.query(query, values);

    return res.json({
      data: result.rows,
    });
  } catch (e) {
    return res.json({
      message: e.message,
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running at ${port}`);
});
