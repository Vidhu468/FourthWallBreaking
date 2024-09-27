const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Required to serve static files

const app = express();
const PORT = process.env.PORT || 5003; // Use a single port for the combined server

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fourth_wall_breaking",  // Replace this with your actual database name
});

// Connect to the database
con.connect(function(err) {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to the database!");
});

// Root endpoint to serve the main HTML page (index.html or your sign-up page)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Fourth Wall Breaking.html'));
});

// Register endpoint
app.post('/register', (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    // Validate input fields
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // SQL query to insert data
    const sql = "INSERT INTO signup (firstname, lastname, email, password) VALUES (?, ?, ?, ?)";
    const values = [firstname, lastname, email, password];

    // Execute SQL query
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("SQL Error:", err);
            return res.status(500).json({ success: false, message: "SQL Error occurred." });
        }
        res.status(200).json({ success: true, message: "Registration successful" });
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validate that both email and password are provided
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    console.log("Login attempt for email:", email);

    // SQL query to check if the user exists with the given email and password in the users table
    const sql = "SELECT * FROM signup WHERE email = ? AND password = ?";  // Replace with your actual table and column names
    const values = [email, password];

    // Execute the SQL query
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("SQL Error:", err);
            return res.status(500).json({ success: false, message: "Database error." });
        }

        // Check if user found
        if (result.length > 0) {
            res.json({ success: true, message: "Login successful!" });
        } else {
            res.json({ success: false, message: "Invalid email or password." });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
