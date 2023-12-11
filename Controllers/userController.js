const Services = require("../Services/userServices");


class Controller {

    async user_Registration(req, res) {

        const payload = req.body
        let result = await Services.user_Registration_services(payload);
        res.json(result);

    }
    async apply_leaves(req, res) {

        const payload = req.body

        let result = await Services.User_apply_leave_services(payload);

        res.json(result);

    }
    async get_userdetails(req, res) {
        const payload = req.params.username

        let result = await Services.get_userdetails(payload);
        console.log("result", result)
        res.json(result);

    }
    async get_total_users(req, res) {

        
        let result = await Services.get_total_users();
        res.json(result);

    }


}
module.exports = new Controller()