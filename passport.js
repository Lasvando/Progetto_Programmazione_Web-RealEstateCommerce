const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("./models/User");
var crypto = require("crypto");

passport.use(
    "register",
    new localStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                var data = {
                    username: req.body.username,
                    email: req.body.email,
                    password: crypto
                        .createHash("sha256")
                        .update(req.body.password)
                        .digest("base64"),
                    phone: req.body.phone,
                };

                const user = await User.create(data);

                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    "login",
    new localStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            console.log(email, password);

            try {
                const user = await User.findOne({ where: { email } });

                if (!user) {
                    return done(null, false, { message: "User not found" });
                }

                password = crypto
                    .createHash("sha256")
                    .update(password)
                    .digest("base64");
                const validate = await User.findOne({
                    where: {
                        email: email,
                        password: password,
                    },
                });

                if (!validate) {
                    return done(null, false, { message: "Wrong Password" });
                }

                return done(null, user, { message: "Logged in Successfully" });
            } catch (error) {
                return done(error);
            }
        }
    )
);
