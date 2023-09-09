const authServices= require("../Services/authServices")

class AuthServices{
    async userRegistration(req,res){
        const payload= req.body
   
        const result= await authServices.userRegistration(payload);
        res.json(result)
       

    }
    async userLogin(req,res){
        const payload= req.body
        const result= await authServices.userLogin(payload);
        res.json(result)
       

    }

}
module.exports=new AuthServices()