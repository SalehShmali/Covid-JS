let express = require("express");
var cros = require('cors')
//var cache = require('express-redis-cache')({host:"127.0.0.1",port:81});
let app = express();


app.use(cros())
app.use(express.static("../static"));
app.use(function(req, res, next) {
    console.log(`${new Date()} - ${req.method} request for ${req.url}`);
    next();
});

var port = 81;
app.listen(port);
console.log("Server listening on :" + port);


