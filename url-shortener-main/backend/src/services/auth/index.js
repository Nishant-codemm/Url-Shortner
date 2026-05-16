const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../models/auth");
const { secrets } = require("../../config/env");

exports.createUser = async (username, email, password) => {
  if (!username || !email || !password) {
    return {
      data: null,
      statusCode: 400,
      message: "Required fields are missing",
    };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedUsername = username.trim();

  let existing = await User.findOne({ email: normalizedEmail });
  if (existing) {
    return {
      data: null,
      statusCode: 400,
      message: "Email already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let user;
  try {
    user = await User.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword,
    });
  } catch (error) {
    if (error.code === 11000) {
      return {
        data: null,
        statusCode: 400,
        message: "Email already exists",
      };
    }

    throw error;
  }

  return {
    data: { id: user._id, username: user.username, email: user.email },
    statusCode: 201,
    message: "Registered Successfully",
  };
};

exports.loginUser = async (email, password) => {
  if (!email || !password) {
    return {
      data: null,
      statusCode: 400,
      message: "Required fields are missing",
    };
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() });
  if (!user) {
    return {
      data: null,
      statusCode: 404,
      message: "Email not found",
    };
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return {
      data: null,
      statusCode: 400,
      message: "Wrong password",
    };
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    secrets.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    data: token,
    statusCode: 200,
    message: "Login Successfull",
  };
};

exports.checkUser = async (id) => {
  if (!id) {
    return {
      data: null,
      statusCode: 404,
      message: "Please login first",
    };
  }

  const user = await User.findById(id).select("-password");
  if (!user) {
    return {
      data: null,
      statusCode: 404,
      message: "User not found",
    };
  }

  return {
    data: user,
    message: "Here's your detail",
    statusCode: 200,
  };
};

exports.updateUser = async (id, data) => {
  if (!id) {
    return {
      data: null,
      statusCode: 404,
      message: "Please login first",
    };
  }

  const user = await User.findById(id);
  if (!user) {
    return {
      data: null,
      statusCode: 404,
      message: "User not found",
    };
  }

  const allowedUpdates = ["username", "email"];
  allowedUpdates.forEach((field) => {
    if (data[field]) user[field] = data[field];
  });

  await user.save();

  const safeUser = await User.findById(id).select("-password");

  return {
    data: safeUser,
    statusCode: 200,
    message: "User updated",
  };
};

exports.deleteUser = async (id) => {
  if (!id) {
    return {
      data: null,
      statusCode: 404,
      message: "Please login first",
    };
  }

  const deleted = await User.findByIdAndDelete(id);
  if (!deleted) {
    return {
      data: null,
      statusCode: 404,
      message: "User not found",
    };
  }

  return {
    data: deleted,
    statusCode: 200,
    message: "User deleted",
  };
};
