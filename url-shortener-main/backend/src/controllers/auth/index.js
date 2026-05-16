const { createUser, loginUser, checkUser, updateUser, deleteUser } = require("../../services/auth");
const { asyncHandler } = require("../../utils/asyncHandler/index");
const ApiResponse = require("../../utils/apiResponse/index");

exports.handleRegistration = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const { message, data, statusCode } = await createUser(username, email, password);

  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});

exports.handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { message, data, statusCode } = await loginUser(email, password);

  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});

exports.handleUserDetails = asyncHandler(async (req, res) => {
  const id = req.id;

  const { message, data, statusCode } = await checkUser(id);

  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});

exports.handleUserUpdation = asyncHandler(async (req, res) => {
  const id = req.id;

  
  const updateData = req.body;

  const { message, data, statusCode } = await updateUser(id, updateData);

  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});

exports.handleUserDeletion = asyncHandler(async (req, res) => {
  const id = req.id;

  const { message, data, statusCode } = await deleteUser(id);

  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});
