const {
  handleRegistration,
  handleLogin,
  handleUserDetails,
  handleUserUpdation,
  handleUserDeletion,
} = require("../../controllers/auth");
const {
  validateRegistration,
  validateLogin,
  validateUpdation,
  validateDeletion,
} = require("../../validator/auth");
const router = require("express").Router();
const { validateRequest } = require("../../middleware/validateRequest/index");
const { isUserOrAdmin } = require("../../middleware/authMiddleware");
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with username, email, password, and role.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mySecret123
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 default: user
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 201
 *                 data:
 *                   type: string
 *                   example: johndoe
 *                 message:
 *                   type: string
 *                   example: Registered Successfully
 *       400:
 *         description: Missing fields or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: Email already exists
 */

router
  .route("/register")
  .post(validateRegistration, validateRequest, handleRegistration);

router.route("/login").post(validateLogin, validateRequest, handleLogin);

router
  .route("/")
  .get(isUserOrAdmin, handleUserDetails)
  .put(isUserOrAdmin, validateUpdation, validateRequest, handleUserUpdation)
  .delete(isUserOrAdmin, validateDeletion, validateRequest, handleUserDeletion);

module.exports = router;
