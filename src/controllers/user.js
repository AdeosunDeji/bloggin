const { errorResponse, handleError, successResponse } = require("../utils/responses");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwt");
const models = require("../models");

class UserController {
  static async createUser(req, res) {
    try {
      const { firstName, lastName, email, password, phone } = req.body;
      const emailExist = await models.User.findOne({ email });
      if (emailExist) {
        return errorResponse(res, 409, "email already registered by another user.");
      }
      const phoneExist = await models.User.findOne({ phone });
      if (phoneExist) {
        return errorResponse(res, 409, "phone number already used by another user.");
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      await models.User.create({
        firstName, lastName, email, password: hashedPassword, phone
      });
      return successResponse(res, 201, "Account created successfully.");
    } catch (error) {
      handleError(error, req);
      errorResponse(res, 500, "server error");
    }
  }

  static async loginUser(req, res) {
    try {
      const { EmailPhone, password } = req.body;

      const user = await models.User.findOne({
        $or: [{
          email: EmailPhone
        }, {
          phone: EmailPhone
        }]
      });
      if (!user) return errorResponse(res, 404, "email or Phone number not found");

      const validpass = await bcrypt.compare(password, user.password);
      if (!validpass) { return errorResponse(res, 404, "Password is not correct!."); }

      const { _id, email, phone } = user;
      const token = await generateToken({ _id, email, phone });
      const userDetails = {
        _id, email, firstname: user.firstName, lastName: user.lastName, phone: user.phone
      };
      return successResponse(
        res,
        200,
        "User Logged in Successfully.",
        { token, userDetails }
      );
    } catch (error) {
      handleError(error, req);
      errorResponse(res, 500, "server error");
    }
  }

  static async uploadProfilePicture(req, res) {
    try {
      const { _id } = req.user;
      const user = await models.User.findByIdAndUpdate(
        _id,
        { photo: req.file?.path },
        { new: true }
      ).select("-password");
      return successResponse(res, 200, "Picture uploaded successfully", user);
    } catch (error) {
      handleError(error, req);
      errorResponse(res, 500, "server error");
    }
  }
 
  static async getAllUsers(req, res) {
    try {
      const users = await models.User.find({});
      return successResponse(res, 200, "All users", users);
    } catch (error) {
      handleError(error, req);
      errorResponse(res, 500, "server error");
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await models.User.findById(id);
      return successResponse(res, 200, "User fetched successfully", user);
    } catch (error) {
      handleError(error, req);
      errorResponse(res, 500, "server error");
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const user = await models.User.findByIdAndUpdate(id, req.body, { new: true });
      return successResponse(res, 200, "User updated successfully", user);
    } catch (error) {
      handleError(error, req);
      errorResponse(res, 500, "server error");
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await models.User.findByIdAndDelete(id);
      return successResponse(res, 200, "User Deleted successfully", user);
    } catch (error) {
      handleError(error, req);
      errorResponse(res, 500, "server error");
    }
  }


}

module.exports = UserController;
