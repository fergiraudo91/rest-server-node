const { Router } = require("express");
const {
  getUsers,
  postUsers,
  deleteUsers,
  putUsers,
  patchUsers,
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);
router.post("/", postUsers);
router.put("/:id", putUsers);
router.delete("/:id", deleteUsers);
router.patch("/:id", patchUsers);

module.exports = router;
