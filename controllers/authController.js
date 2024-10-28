const userService = require("./services/userService");

// const generateToken = async (req, res) => {
//   try {
//     const { authorization } = req.headers;
//     // console.log(authorization);
//     const newToken = await authService.generateNewToken(authorization);
//     res.json({
//       payment_token: newToken,
//       pid_token: parseInt(Math.random() * 10000000000000),
//     });
//   } catch (err) {
//     res.status(401).json({ error: err.message });
//   }
// };

// module.exports = {
//   generateToken,
// };
