const jwt = require("jsonwebtoken");
const ApiResponse = require("../../utils/apiResponse");

exports.isUserOrAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json(new ApiResponse(400, null, "Access Denied"));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (
      !decodedToken ||
      (decodedToken.role !== "user" && decodedToken.role !== "admin")
    ) {
      return res.status(400).json(new ApiResponse(400, null, "Access Denied"));
    }

    req.role = decodedToken.role;
    req.username = decodedToken.username;
    req.id = decodedToken.id;
    req.email = decodedToken.email;

    next();
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json(new ApiResponse(500, null, "Server Error"));
  }
};

exports.OnlyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json(new ApiResponse(400, null, "Access Denied"));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken || decodedToken.role !== "admin") {
      return res.status(400).json(new ApiResponse(400, null, "Access Denied"));
    }

    req.admin = decodedToken.role;
    req.username = decodedToken.username;
    req.id = decodedToken.id;

    next();
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json(new ApiResponse(500, null, "Server Error"));
  }
};
