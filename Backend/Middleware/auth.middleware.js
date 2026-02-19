import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies?.["jwt-Token"];
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach to request object
    req.user = decoded;
  console.log({req});
  
    // now req.user is available in all downstream routes
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
