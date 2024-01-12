const app  = require("./app")
require("./app/config/database")

app.listen(5000 ,()=>{
    console.log("Server is working on 5000")
})  