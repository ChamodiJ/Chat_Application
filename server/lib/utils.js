import jwt from "jsonwebtoken";

// funtion to generate a token for a user
export const generateToken = (user) => {
const token = jwt.sign({userId}, process.env.JWT_SECRET);
return token;
return token;
}