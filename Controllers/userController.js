const Services = require("../Services/userServices")
const mongoose = require("mongoose");

class Controller {
    async createfeeds(req, res) {
        let payload = req.userDetails
        let reqBody=req.body
        const file= req.file
        let result = await Services.createfeeds(payload,file,reqBody);
        console.log("result", result)
        res.json(result);

    }
    async getUsertFeedsList(req, res) {
        const reqBody=req.userDetails
        const pageNumber = parseInt(req.query.pageNumber) || 0;
        const limit = parseInt(req.query.limit) || 10;
        let result = await Services.getUsertFeedsList(pageNumber,limit,reqBody);
        console.log("result", result)
        res.json(result);

    }
   

}
module.exports = new Controller()