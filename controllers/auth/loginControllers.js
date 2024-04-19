const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Auth } = require("../../models");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({
      where: {
        email,
      },
      include: ["User"],
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.userId,
          username: user.User.name,
          role: user.User.role,
          email: user.email,
          companyId: user.User.companyId,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXP,
        }
      );

      res.cookie("_token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 100,
      });

      // res.render("dashboard", {
      //     _token: req.cookies._token,
      // });
      res.status(200).json({
        status: true,
        message: "Login Success",
        _token: token,
      });
    } else {
      next(
        createHttpError(400, {
          message: "Wrong Password or user not found",
        })
      );
    }
  } catch (error) {
    next(createHttpError(500, { message: error.message }));
  }
};

module.exports = {
  login,
};
