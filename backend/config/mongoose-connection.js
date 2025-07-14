const mongoose = require('mongoose');
const dbgr = require('debug')("development:mongoose");
const config = require('config');
const connectDB = ()=>{
    return mongoose.connect(`${config.get("MONGODB_URI")}/my-project`)
                    .then(()=>{
                        dbgr("connected");
                    })
                    .catch((err)=>{
                        dbgr(err);
                    })
}

module.exports = connectDB;