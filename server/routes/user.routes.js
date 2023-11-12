const router = require("express").Router();
const {
  login,
  getAllUsers,
  register,
  deleteUser,
} = require("../controllers/user.controller");

// auth for all
router.post("/login", login);
router.get("/allUsers", getAllUsers);
router.post("/registeruser", register);
router.delete("/deleteUser/:id", deleteUser);
module.exports = router;
