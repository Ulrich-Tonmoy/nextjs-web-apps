// import { isTokenValid } from "../utils/jwt";
// import * as dotenv from "dotenv";

// dotenv.config();

// export const authHandler = async (req, res, next) => {
//   try {
//     const decode: any = isTokenValid(req.headers.authorization.split(" ")[1].toString());
//     // TODO Send id in body for all request
//     // if (req.body._id == decode?.id) {
//     if (decode) {
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
