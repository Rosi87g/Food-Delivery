import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    req.user = { id: decoded.id }; // ✅ Attach user info safely
    next();
  } catch (error) {
    console.log("JWT Error:", error);
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default authMiddleware;
