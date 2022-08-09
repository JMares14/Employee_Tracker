const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL Username
      user: 'root',
      password: 'DGKallday123410!',
      database: 'employee_tracker'
    },
    console.log(`Connected to the employee_tracker database.`)
  );
  
  // Query database using COUNT() and GROUP BY
  db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
    console.log(results);
  });
  
  // Query database using SUM(), MAX(), MIN() AVG() and GROUP BY
  db.query('SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
    console.log(results);
  });
  
  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });