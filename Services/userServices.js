const response = require("../Utilities/error-handling")
const usermodel = require("../models/usermodel");
const Leavesmodel = require("../models/leavemodel")
const validation = require("../userValidation/userValidation")
const moment = require('moment');
const leavesmodel = require("../models/leavemodel");
const { apply_leaves } = require("../Controllers/userController");

class services {

    async user_Registration_services(payload) {
        console.log(payload)
        try {
            const validationResult = validation.registration_validation(payload);
            if (validationResult.error) {
                return response.badRequest("invalid request", validationResult.error.details.map(data => data.message))
            }
            const datafind = await usermodel.findOne({ username: payload.username })

            if (datafind) {
                return response.Unauthorized("!! username is already exist try another one ")
            }

            const dataSave = new usermodel({
                username: payload.username,
                department: payload.department,
                sickleave: 2,
                casualleave: 2
            })
            await dataSave.save();
            return response.sendSuccess("Registration is successfully done")

        } catch (error) {
            console.log(error)
            return response.Internal_Server_Error("!! Oops  something it didn't expect and was unable to complete the request")
        }

    }
    async User_apply_leave_services(payload) {

        try {
            console.log("payload", payload)
            const validationResult = validation.apply_leave_validation(payload);


            if (validationResult.error) {
                return response.badRequest("invalid request", validationResult.error.details.map(data => data.message))
            }
            const startDate = moment(payload.startdate);
            const endDate = moment(payload.enddate);


            const daysDifference = endDate.diff(startDate, 'days') + 1;

            const findLeave = await usermodel.findOne({ username: payload.username })
            if (!findLeave) {
                return response.Not_found("username is not  exist");
            }

            if (payload.leavetype == "sickleave") {
                const leavepending = findLeave.sickleave - daysDifference;


                if (leavepending < 0) {
                    return response.badRequest("No Sick leave is available.");
                } else {
                    const result = await usermodel.updateOne({ username: payload.username }, {
                        $set: {
                            sickleave: leavepending,


                        },
                    });

                }
            } else if (payload.leavetype == "casualleave") {
                const leavepending = findLeave.casualleave - daysDifference;

                if (leavepending < 0) {
                    return response.badRequest("No Casual leave  is available.");
                } else {
                    const result = await usermodel.updateOne({ username: payload.username }, {
                        $set: {
                            casualleave: leavepending,
                        }

                    },);

                }
            }
            const dataSave = new Leavesmodel({
                username: payload.username,

                leavetype: payload.leavetype,
                startdate: new Date(payload.startdate).toISOString().slice(0, 10),
                enddate: new Date(payload.enddate).toISOString().slice(0, 10)

            })
            await dataSave.save();
            return response.sendSuccess("leave is successfully applyed")
        } catch (error) {

            return response.Internal_Server_Error("Oops! Something unexpected happened, and we were unable to complete the request.");
        }
    }



    async get_userdetails(payload) {

        try {

            if (!payload) {
                return response.Not_found("fill proper query parameter")
            }
            const usermodel_datafind = await usermodel.findOne({ username: payload });

            if (!usermodel_datafind) {
                return response.Not_found("user not exist")
            }

            const leavemodel_datafind = await leavesmodel.find({ username: payload });

            const responseData = {
                username: usermodel_datafind.username,
                department: usermodel_datafind.department,
                totalSickleave: usermodel_datafind.sickleave,
                totalCasualLeave: usermodel_datafind.casualleave,
                apply_leaveInfo: leavemodel_datafind


            };

            return response.sendSuccess("leave is successfully applyed", responseData)

        } catch (error) {
            return response.Internal_Server_Error("Oops! Something unexpected happened, and we were unable to complete the request.");

        }
    }
    async get_total_users() {

        try {
            const datafind = await usermodel.find({});




            return response.sendSuccess("data is sucessfully get", datafind)

        } catch (error) {
            console.log(error)
            return response.Internal_Server_Error("!! Oops  something it didn't expect and was unable to complete the request")
        }

    }
};




module.exports = new services()