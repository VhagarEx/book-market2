import express from "express";
import pkg from "pg";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { auth, adminOnly } from "./middleware/authMiddleware.js";

dotenv.config();

const { Pool } = pkg;
const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

/* =====================================================
   AUTH
===================================================== */

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1,$2)",
      [email, hash]
    );
    res.json({ message: "User created" });
  } catch {
    res.status(400).json({ error: "User already exists" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (!result.rows.length)
    return res.status(401).json({ error: "User not found" });

  const user = result.rows[0];
  const ok = await bcrypt.compare(password, user.password);

  if (!ok)
    return res.status(401).json({ error: "Wrong password" });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  });
});

/* =====================================================
   BOOKS
===================================================== */

app.get("/api/books", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM books WHERE is_active = true ORDER BY id DESC"
  );
  res.json(result.rows);
});

app.get("/api/books/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.sendStatus(400);

  const result = await pool.query(
    "SELECT * FROM books WHERE id = $1",
    [id]
  );

  res.json(result.rows[0]);
});

/* =====================================================
   CART
===================================================== */

app.post("/api/cart", auth, async (req, res) => {
  const { bookId } = req.body;

  const exists = await pool.query(
    "SELECT * FROM cart WHERE user_id=$1 AND book_id=$2",
    [req.user.id, bookId]
  );

  if (exists.rows.length) {
    await pool.query(
      "UPDATE cart SET quantity = quantity + 1 WHERE user_id=$1 AND book_id=$2",
      [req.user.id, bookId]
    );
  } else {
    await pool.query(
      "INSERT INTO cart (user_id, book_id, quantity) VALUES ($1,$2,1)",
      [req.user.id, bookId]
    );
  }

  res.json({ message: "Added" });
});

app.get("/api/cart", auth, async (req, res) => {
  const result = await pool.query(`
    SELECT c.book_id, b.title, b.price, c.quantity
    FROM cart c
    JOIN books b ON b.id = c.book_id
    WHERE c.user_id = $1
  `, [req.user.id]);

  res.json(result.rows);
});

app.delete("/api/cart/:bookId", auth, async (req, res) => {
  await pool.query(
    "DELETE FROM cart WHERE user_id=$1 AND book_id=$2",
    [req.user.id, req.params.bookId]
  );

  res.json({ message: "Removed" });
});

/* =====================================================
   CHECKOUT
===================================================== */

app.post("/api/checkout", auth, async (req, res) => {
  const cart = await pool.query(`
    SELECT c.book_id, c.quantity, b.price
    FROM cart c
    JOIN books b ON b.id = c.book_id
    WHERE c.user_id = $1
  `, [req.user.id]);

  if (!cart.rows.length)
    return res.status(400).json({ error: "Cart empty" });

  const total = cart.rows.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const order = await pool.query(
    "INSERT INTO orders (user_id, total_price) VALUES ($1,$2) RETURNING id",
    [req.user.id, total]
  );

  for (const item of cart.rows) {
    await pool.query(
      `INSERT INTO order_items (order_id, book_id, quantity, price)
       VALUES ($1,$2,$3,$4)`,
      [order.rows[0].id, item.book_id, item.quantity, item.price]
    );
  }

  await pool.query("DELETE FROM cart WHERE user_id=$1", [req.user.id]);

  res.json({
    message: "Order created",
    orderId: order.rows[0].id
  });

});

/* =====================================================
   ORDERS
===================================================== */

app.get("/api/orders", auth, async (req, res) => {
  const result = await pool.query(`
    SELECT o.id, o.total_price, o.status, o.created_at,
    json_agg(json_build_object(
      'title', b.title,
      'price', oi.price,
      'quantity', oi.quantity
    )) AS items
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN books b ON b.id = oi.book_id
    WHERE o.user_id = $1
    GROUP BY o.id
    ORDER BY o.created_at DESC
  `, [req.user.id]);

  res.json(result.rows);
});

app.patch("/api/orders/:id/status", auth, adminOnly, async (req, res) => {
  const { status } = req.body;

  const allowed = ["pending", "paid", "shipped", "completed", "cancelled"];
  if (!allowed.includes(status))
    return res.status(400).json({ error: "Invalid status" });

  await pool.query(
    "UPDATE orders SET status=$1 WHERE id=$2",
    [status, req.params.id]
  );

  res.json({ message: "Status updated" });
});

/* =====================================================
   ADMIN
===================================================== */

app.get("/api/admin/books", auth, adminOnly, async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM books WHERE is_active = true ORDER BY id DESC"
  );
  res.json(result.rows);
});

app.post("/api/admin/books", auth, adminOnly, async (req, res) => {
  const { title, author, price, image } = req.body;

  if (!title || !author || isNaN(price))
    return res.status(400).json({ error: "Invalid data" });

  await pool.query(
    "INSERT INTO books (title, author, price, image) VALUES ($1,$2,$3,$4)",
    [title, author, Number(price), image]
  );

  res.json({ message: "Book added" });
});

app.put("/api/admin/books/:id", auth, adminOnly, async (req, res) => {
  const { title, author, price, image } = req.body;

  await pool.query(
    `UPDATE books
     SET title=$1, author=$2, price=$3, image=$4
     WHERE id=$5`,
    [title, author, Number(price), image, req.params.id]
  );

  res.json({ message: "Updated" });
});

app.delete("/api/admin/books/:id", auth, adminOnly, async (req, res) => {
  const result = await pool.query(
    "UPDATE books SET is_active=false WHERE id=$1 RETURNING id",
    [req.params.id]
  );

  if (!result.rowCount)
    return res.status(404).json({ error: "Not found" });

  res.json({ message: "Deleted" });
});

app.get("/api/admin/orders", auth, adminOnly, async (req, res) => {
  const result = await pool.query(`
    SELECT 
      o.id,
      o.total_price,
      o.status,
      o.created_at,
      u.email,
      json_agg(
        json_build_object(
          'title', b.title,
          'price', oi.price,
          'quantity', oi.quantity
        )
      ) AS items
    FROM orders o
    JOIN users u ON u.id = o.user_id
    JOIN order_items oi ON oi.order_id = o.id
    JOIN books b ON b.id = oi.book_id
    WHERE o.status != 'completed'
    GROUP BY o.id, u.email
    ORDER BY o.created_at DESC
  `);

  res.json(result.rows);
});

app.get("/api/admin/stats", auth, adminOnly, async (req, res) => {
  const users = await pool.query("SELECT COUNT(*) FROM users");

  const orders = await pool.query(
    "SELECT COUNT(*) FROM orders WHERE status != 'completed'"
  );

  const revenue = await pool.query(
    "SELECT COALESCE(SUM(total_price), 0) FROM orders"
  );

  const pending = await pool.query(
    "SELECT COUNT(*) FROM orders WHERE status='pending'"
  );

  res.json({
    users: users.rows[0].count,
    orders: orders.rows[0].count,
    revenue: revenue.rows[0].coalesce,
    pending: pending.rows[0].count
  });
});

/* ===================================================== */

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
