var db = require("../database-mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const first_name = "DHaou";
    const last_name = "Admin yahya";
    const phone = "90620017";
    const created_at = "2024-01-01"
 const role ="Admin"
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (first_name, last_name, email, password, phone, created_at,role) VALUES (?,?,?,?,?,?,?) ";
    db.query(
      sql,
      [
        first_name,
        last_name,
        email,
        hashedPassword,
        phone,
        created_at,
        role,
      ],
      (err, result) => {
       if (err) console.log(err);
       else 
       res.status(201).json({ message: "Admin registered successfully" });
      }
    );

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
  
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = "SELECT * FROM  users WHERE email = ?";
    db.query(sql, [email], async (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else if (result.length === 0) {
        res.status(401).json({ message: "Email or password is incorrect" });
      } else {
        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          if (user.role === 'Admin') {
            const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });
            res.status(200).json({ message: "Login successful", token, id: user.id });
          } else {
            res.status(401).json({ message: "You do not have permission to access this resource", userId: user.id });

          }
        } else {
          res.status(401).json({ message: "Email or password is incorrect" });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
// get all users
let getAllUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
};
// delete one user
const deleteUser = (req, res) => {
  const userId = req.params.userId;
  const query = `DELETE FROM users WHERE id = ?`;
  db.query(query, [userId], (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};

module.exports = {
  getAllUsers,
  deleteUser,
  register,
  login,
};
