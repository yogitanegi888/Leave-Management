
const authuser = require("../models/authModel");
const response = require("../Utilities/error-handling");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
class AuthServices {

    async userRegistration(payload) {
        try {
            const findData = await authuser.findOne({ email: payload.email })
         
            if (findData) {
                return response.Unauthorized("Email address is allready exist try another one ")

            }
         
            const passwordEncripted = bcrypt.hashSync(payload.password, bcrypt.genSaltSync())
            const saveData = new authuser({
                email: payload.email,
                password: passwordEncripted,
                intrestedFeeds: payload.intrestedFeeds,
                username: payload.username
            })
            await saveData.save()
            return response.sendSuccess("user is successfully Registration")


        } catch (error) {
            console.log(error)
            return response.Internal_Server_Error("!! Oops  something it didn't expect and was unable to complete the request")

        }
    }
    async userLogin(payload) {
        try {
            const findData = await authuser.findOne({ email: payload.email })
            if (!findData) {
                return response.Not_found("data not found")
            }
            if (!(bcrypt.compareSync(payload.password, findData.password))) {
                return response.Unauthorized("please pass correct password")
            }
            const tokenPayload = {
                email: payload.email,
              
            }
            const token = jwt.sign(tokenPayload, process.env.SECRETJWTKEY, { algorithm: "HS256" })

            const saveData = await authuser.updateOne({
                email: payload.email
            }, { $set: { isEnable: true } }, { upsert: true })


            return response.sendSuccess("user is successfully login", { data: token })

        } catch (error) {
            console.log(error)
            return response.Internal_Server_Error("!! Oops  something it didn't expect and was unable to complete the request")

        }

    }
}
module.exports = new AuthServices()