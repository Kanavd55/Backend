const adminAuth = (req,res,next)=>{
    console.log("adminAuth")
    next();
}

const userAuth = (req,res,next)=>{
    console.log("userAuth")
    next();
}

module.exports = {
    adminAuth,userAuth
}