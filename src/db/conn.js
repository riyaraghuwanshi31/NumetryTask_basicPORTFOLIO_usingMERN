const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/dynamicProj", {

}).then(()=>{
    console.log("Connection successfully done....");
}).catch((error)=>{
    console.log(error);
})
