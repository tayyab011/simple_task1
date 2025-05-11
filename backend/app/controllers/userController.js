
import { userModel } from "../models/userModel.js";
import cloudinary from "../utility/cloudinary.js";
import getDataUri from "../utility/datauri.js";
import { EncodeToken } from './../utility/tokenUtility.js';

export const register =async(req,res)=>{

    try {
        const { fullname, email, phoneNumber, password } = req.body;
    const file =req.file
  
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        if (!fullname || !email || !phoneNumber|| !password) {
          return  res.status(400).json({
            success:false,
            message:"Please Fill All Data"
          })
        }
       const existingData = await userModel.findOne({
         $or: [{ email }, { phoneNumber }],
       });
       if (existingData) {
        return res.status(400).json({
          success: false,
          message: "User Exists",
        });
       }
        await userModel.create({
          fullname,
          email,
          phoneNumber,
          password,
          profilepic: cloudResponse.secure_url
        });
        res.status(200).json({
          success: true,
          message: "User Register SuccessFully",
        });
        
    } catch (error) {
        return res.status(400).json({
            message:"somthing went wrong",
            error:error.toString()
        })
    }
}

export const login = async (req, res) => {
  try {
    const {  email, password } = req.body;

    if ( !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All Data",
      });
    }
    const user = await userModel.findOne({
      $or: [{ email }],

    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email.",
      });
    }
    const token = EncodeToken({ email: user.email, user_id: user._id });
    const cookiOption = {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      sameSite: "none",
      secure: true,
      path: "/",
    };
    res.cookie('token',token, cookiOption)
    res.status(200).json({
      success: true,
      user,
      message: "User Login SuccessFully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "somthing went wrong",
      error: error.toString(),
    });
  }
};
 export const getMyProfile = async (req, res) => {
  try {
    let user_id = req.headers["user_id"];
    const user = await userModel.findById({ _id: user_id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

  }; 


  /* export const getMyProfile = async (req, res) => {
    try {
      // Get user_id from headers after token is decoded by middleware
      const user_id = req.headers["user_id"];

      // If no user_id exists, send an error
      if (!user_id) {
        return res
          .status(400)
          .json({ success: false, message: "User not authenticated" });
      }

      // Find user by _id
      const user = await userModel.findById(user_id); // _id is directly passed as string
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      // Return the user data
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
   */




  export const logout = async (req, res) => {
    try {
      // Clear the token cookie with security flags
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(0),
      });

      // Optional: Destroy session if using server-side sessions
      // if (req.session) req.session.destroy();

      res.status(200).json({
        success: true,
        message: "User logged out successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Logout failed",
        error: error.message,
      });
    }
  };