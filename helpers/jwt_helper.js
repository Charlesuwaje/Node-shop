const JWT = require ('jsonwebtoken');

module.exports = {
    // sign: (payload) => JWT.sign(payload, process.env.JWT_SECRET),
    signAccessToken:(user_id)=>{

        const payload={
            name:"yours trully"
        }
        const secret = "some serect"
        const option = {}
        JWT.sign(payload, secret, option,(err, token)=>{
            if(err)reject(err)
            resolve (token)
        })
    }
}