import { getAuth, onAuthStateChanged } from "firebase/auth";
import connectDB from "../config/db.js";

connectDB();
const auth = getAuth();

const authMiddleware = (req, res, next) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      next();
    } else {
      // User is signed out, you can handle unauthorized access here
      res.status(401).json({ message: "Unauthorized" });
    }
  });
};

export default authMiddleware;
