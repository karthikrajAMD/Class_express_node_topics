import express from "express";
import bcrypt from "bcrypt";
import {
  genPassword,
  createUserAndPassword,
  userExist,
} from "../separate_user_signup_login.js";
import jwt from "jsonwebtoken";
const router = express.Router();

//.............POST  signup...........
router.post("/signup", async (req, res) => {
  const { userName, password } = req.body;
  const regularExpression =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  console.log(userName, password);
  const isUserExist = await userExist(userName);
  if (isUserExist) {
    res.status(400).send({ message: "UserName already taken" });
    return res;
  }
  if (!regularExpression.test(password)) {
    res.status(400).send({ message: "Password doesn't meet the requirements" });
    return res;
  }
  const hashedPassword = await genPassword(password);
  const createUser = await createUserAndPassword(userName, hashedPassword);
  res.send(createUser);
});
//.............POST  login...........
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const userFromDb = await userExist(userName);
  console.log(userFromDb);

  if (!userFromDb) {
    res.status(400).send({ message: "Invalid Credential" });
    return res;
  }
  const passwordFromDb = userFromDb.Password;
  const findMatchPassword = await bcrypt.compare(password, passwordFromDb);
  console.log(findMatchPassword);
  if (!findMatchPassword) {
    res.status(400).send({ message: "Password is wrong" });
    return res;
  }
  const token = jwt.sign({ id: userFromDb._id }, process.env.SECRET_KEY);
  res.send({ message: "Login Successful", token: token });
});
export const userRouter = router;
