import { verify } from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });

    const verified = verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });
    req.user = verified;
    next();
  } catch (err) {
    res
      .status(500)
      .json({ error: "Token verification failed, authorization denied." });
  }
};

export const isUserCheck = (req, res, next) => {
  if (req?.user?.role !== "user") {
    return res
      .status(401)
      .json({ message: "Not Logged In. Please log in and try again." });
  }
  next();
};

export const isAdminCheck = (req, res, next) => {
  if (req?.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access denied" });
  }
  next();
};
