const response = require("../Utilities/error-handling")
const userFeeds = require("../models/usermodel")

class services {
    async createfeeds(payload, file, reqBody) {
        console.log(payload)
        try {

            if (!payload) {
                return response.Unauthorized("please fill proper body  payload")
            }
            console.log("payload", payload, file)
            payload.image = file.path

            let array = reqBody.intrested.split(',')

            const data = new userFeeds({
                description: reqBody.description,
                userid: payload._id,
                intrested: array,
                image: reqBody.image


            })
            await data.save()
            return response.sendSuccess("Admin details is successfully created");

        } catch (error) {
            console.log(error)
            return response.Internal_Server_Error("!! Oops  something it didn't expect and was unable to complete the request")
        }

    }
    async getUsertFeedsList(pageNumber, limit, reqBody) {
        try {
           
            const getData = await userFeeds.find({ intrested: { $in: reqBody.intrestedFeeds } }).skip(limit * pageNumber).limit(limit).sort({ time: 1 });
            if (!getData) {
                return response.Not_found("data not found")
            }
        
            return response.sendSuccess("get Successfully all Product List", getData)

        } catch (error) {
            console.log(error)
            return response.Internal_Server_Error("!! Oops  something it didn't expect and was unable to complete the request")
        }
    }
    async updateProduct(queryParameter, payload, file) {
        try {
           

            if (file) {
                payload.image = file.path
            }
            const getData = await productListmodel.findOneAndUpdate({ _id: queryParameter }, { $set: { ...payload } })
            if (!getData) {
                return response.Not_found("data not found")
            }
            return response.sendSuccess("data is  Successfully updated")

        } catch (error) {
            console.log(error)
            return response.Internal_Server_Error("!! Oops  something it didn't expect and was unable to complete the request")
        }
    }
    async deleteProduct(queryParameter) {
        try {
            const getData = await productListmodel.deleteMany({ _id: queryParameter })
            if (!getData) {
                return response.Not_found("data not found")
            }
            return response.sendSuccess("data is  Successfully  Deleted")

        } catch (error) {
            return response.Internal_Server_Error("!! Oops  something it didn't expect and was unable to complete the request")
        }
    }
}
module.exports = new services()