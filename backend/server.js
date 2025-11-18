// server.js
const express = require("express");
const cors = require("cors");
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const UserAuth = require('./models/user.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
  secret: 'your-secret-key-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, 
    maxAge: 24*60*60*1000 
  }
}));

const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

const PORT = 3000;

// Middleware to check authentication
const requireAuth = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ success: false, message: 'Please login to continue' });
  }
};

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Dashboard Views 1–10
app.get("/api/view1", (req, res) => res.json({ message: "View 1 data" }));
app.get("/api/view2", (req, res) => res.json({ message: "View 2 data" }));
app.get("/api/view3", (req, res) => res.json({ message: "View 3 data" }));
app.get("/api/view4", (req, res) => res.json({ message: "View 4 data" }));
app.get("/api/view5", (req, res) => res.json({ message: "View 5 data" }));
app.get("/api/view6", (req, res) => res.json({ message: "View 6 data" }));
app.get("/api/view7", (req, res) => res.json({ message: "View 7 data" }));
app.get("/api/view8", (req, res) => res.json({ message: "View 8 data" }));
app.get("/api/view9", (req, res) => res.json({ message: "View 9 data" }));
app.get("/api/view10", (req, res) => res.json({ message: "View 10 data" }));

// HTML Routes
app.get('/login.html', (req, res) => res.sendFile(path.join(frontendPath, 'login.html')));
app.get('/password-login.html', (req, res) => res.sendFile(path.join(frontendPath, 'password-login.html')));
app.get('/signup-login.html', (req, res) => res.sendFile(path.join(frontendPath, 'signup-login.html')));

// Authentication API Routes
app.post('/api/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    const exists = await UserAuth.emailExists(email);
    res.json({ exists });
  } catch (err) {
    console.error('Email check error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const result = await UserAuth.login(email, password);
    
    if (result.success) {
      req.session.userId = result.user.user_id;
      req.session.userRole = result.user.role_id;
    }
    
    res.json(result);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;
    
    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const result = await UserAuth.register(fullName, email, phone, password);
    
    if (result.success) {
      req.session.userId = result.user_id;
      req.session.userRole = 1; // Default role for new users
    }
    
    res.json(result);
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

app.get('/api/user', requireAuth, async (req, res) => {
  try {
    const result = await UserAuth.getUserById(req.session.userId);
    res.json(result);
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/api/user/profile', requireAuth, async (req, res) => {
  try {
    const { fullName, phone } = req.body;
    const result = await UserAuth.updateProfile(req.session.userId, fullName, phone);
    res.json(result);
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/api/user/password', requireAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const result = await UserAuth.changePassword(req.session.userId, oldPassword, newPassword);
    res.json(result);
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/auth/status', (req, res) => {
  res.json({
    authenticated: !!req.session.userId,
    userId: req.session.userId || null,
    roleId: req.session.userRole || null
  });
});

app.get('/api/user/orders', requireAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const result = await UserAuth.getUserOrders(userId);
    res.json(result);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/user/orders/:orderId', requireAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const orderId = req.params.orderId;
    const result = await UserAuth.getOrderDetails(orderId, userId);
    res.json(result);
  } catch (error) {
    console.error('Get order details error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Root redirect
app.get("/", (req, res) => res.redirect("/dashboard.html"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});