// server.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.static("public")); // serves dashboard.html, css, js

// ----- DB POOL (PUT YOUR WORKING CREDS HERE) -----
const db = mysql.createPool({
  host: "localhost",
  user: "root",          // e.g. 'root' or 'dashboard_user'
  password: "",  // same one you use in Workbench
  database: "retail_store",      // schema with your views
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper to run queries
function runQuery(sql, res) {
  db.query(sql, (err, results) => {
    if (err) {
      console.error("SQL error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
}

// Health check
app.get("/api/health", (req, res) => runQuery("SELECT 1 AS ok", res));

// Views 1–10
app.get("/api/view1",  (req, res) => runQuery("SELECT * FROM View1_OrderSummary", res));
app.get("/api/view2",  (req, res) => runQuery("SELECT * FROM View2_HighSpenders", res));
app.get("/api/view3",  (req, res) => runQuery("SELECT * FROM View3_AboveAverageOrders", res));
app.get("/api/view4",  (req, res) => runQuery("SELECT * FROM View4_FullProductInventory", res));
app.get("/api/view5",  (req, res) => runQuery("SELECT * FROM View5_AllUsers", res));
app.get("/api/view6",  (req, res) => runQuery("SELECT * FROM View6_PendingOrders", res));
app.get("/api/view7",  (req, res) => runQuery("SELECT * FROM View7_InventoryValueByLocation", res));
app.get("/api/view8",  (req, res) => runQuery("SELECT * FROM View8_OrderItemCount", res));
app.get("/api/view9",  (req, res) => runQuery("SELECT * FROM View9_LowStockProducts", res));
app.get("/api/view10", (req, res) => runQuery("SELECT * FROM View10_CompletedOrdersSummary", res));

// Root → dashboard
app.get("/", (req, res) => res.redirect("/dashboard.html"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT}/dashboard.html`);
});
