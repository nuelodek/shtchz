const userService = require("../services/userservice");

module.exports = {
  signupController: async (req, res) => {
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
  },  
  
  
  getUserController: async (req, res) => {
    try {
      const user = await userService.getUser(req, res);
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  signinController: async (req, res) => {
    try {
      const user = await userService.getSignin(req, res);
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  forgetPasswordController: async (req, res) => {
    try {
      const result = await userService.forgetPassword(req, res);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  getRegisteredUserController: async (req, res) => {
    try {
      const users = await userService.getRegisteredUser(req, res);
      res.status(200).json({ success: true, data: users });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  sendOtpController: async (req, res) => {
    try {
      const result = await userService.sendOtp(req, res);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  resetPasswordController: async (req, res) => {
    try {
      const result = await userService.resetPassword(req, res);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  validatePasswordController: async (req, res) => {
    try {
      const result = await userService.validatePassword(req, res);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  pickUsernameController: async (req, res) => {
    try {
      const result = await userService.pickUsername(req, res);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  addOccupationController: async (req, res) => {
    try {
      const result = await userService.addOccupation(req, res);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  customizeExperienceController: async (req, res) => {
    try {
      const result = await userService.customizeExperience(req, res);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  signInflowController: async (req, res) => {
    try {
      const result = await userService.signInflow(req, res);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  uploadProfilePictureController: async (req, res) => {
    try {
      const result = await userService.uploadProfilePicture(req, res);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  addBioController: async (req, res) => {
    try {
      const result = await userService.addBio(req, res);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  addLocationController: async (req, res) => {
    try {
      const result = await userService.addLocation(req, res);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  getLocationController: async (req, res) => {
    try {
      const result = await userService.getLocation(req, res);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  pickInterestsController: async (req, res) => {
    try {
      const result = await userService.pickInterests(req, res);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  pickIntentionController: async (req, res) => {
    try {
      const result = await userService.pickIntention(req, res);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  suggestFollowController: async (req, res) => {
    try {
      const result = await userService.suggestFollow(req, res);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  pickThemeController: async (req, res) => {
    try {
      const result = await userService.pickTheme(req, res);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  composePredictionController: async (req, res) => {
    try {
      const result = await userService.composePrediction(req, res);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
