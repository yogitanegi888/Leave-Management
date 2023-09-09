

const jwts = require("jsonwebtoken")
const authModel=require("../models/authModel")
class Middleware {

    Middleware_Auth = (acceptedRoles) => {
        return async function (req, res, next) {
            try {
                const AUTH_HEADER = "Authorization";
                const auth_header = req.header(AUTH_HEADER);

                if (!auth_header || !auth_header.startsWith("Bearer ")) {
                    return res.status(401).json({
                        status: 401,
                        message: "Authentication Failed. please send Bearer Token",
                    });
                }
                const token = auth_header.substr(7);
                const tcheck = jwts.verify(token, process.env.SECRETJWTKEY);
                console.log("tcheck", tcheck)
                if (!tcheck) {
                    return res.status(401).json({
                        status: 401,
                        message: "Authentication Failed. Token Expired or Malformed Token"
                    });
                }

                const findUserDetails= await authModel.findOne({email:tcheck.email})
                req.userDetails = findUserDetails;
                next()




            } catch (err) {

                return res.status(401).json({
                    status: 401,
                    message:
                        "Authentication Failed. Token Expired or Malformed Token"
                });
            }
        }

    }
}


module.exports = new Middleware()