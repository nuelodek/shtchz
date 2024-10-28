const userService = require("../services/userservice");


const signupController = async (req, res) => {
      try {
      const signupUser = await userService.getSignup(req, res);
      res.status(200).json({
          success: true,
          message: "User registered successfully",
          data: signupUser,
        });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }

    }
module.exports = {
  signupController
};

