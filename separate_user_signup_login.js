import bcrypt from "bcrypt";
import { db2 } from "./index.js";

// ................. gen password.................
export async function genPassword(pass) {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPass = await bcrypt.hash(pass, salt);
  console.log("Hashed Password:", hashedPass);
  return hashedPass;
}
//....................user create to databse ..............
export async function createUserAndPassword(user, pass) {
  return await db2.insertOne({
    userName: user,
    Password: pass,
  });
}
//...................user exist checking.................
export async function userExist(user) {
  return await db2.findOne({ userName: user });
}
//..................login function..........
export async function getUserFromDb(user) {
  return await db2.findOne({ userName: user });
}
