var userService = require('./userService');

var getEmailDataConntrollerfn = async (req, res) =>
{
    var empolyee = await userService.getEmailDataFromDBService(req.params.email);
    res.send({ "status": true, "data": empolyee });
}

var getSingleChatControllerFn = async (req, res) =>
{
    var empolyee = await userService.getChatRoomDataFromDBService(req.params.roomID);
    res.send({ "status": true, "data": empolyee });
}


var createChatConntrollerfn = async (req, res) =>
{
    var empolyee = await userService.createChatDBService(req.body);
    res.send({ "status": true, "message": "User created successfully" });
}

var createUserControllerFn = async (req, res) =>
{
    console.log(req.body);
    var status = await userService.createUserDBService(req.body);
    if (status) {
        res.send({ "status": true, "message": "User created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating user" });
    }
}
var getDataConntrollerfn = async (req, res) =>
{
    var empolyee = await userService.getDataFromDBService();
    res.send({ "status": true, "data": empolyee });
}
var getChatControllerFn = async (req, res) =>
{
    var empolyee = await userService.getChatFromDBService();
    res.send({ "status": true, "data": empolyee });
}

var getDataUpdateControllerFn = async (req, res) =>
{
    var result = await userService.updateUserDBService(req.params.id,req.body);
 
     if (result) {
        res.send({ "status": true, "message": "User Updateeeedddddd"} );
     } else {
         res.send({ "status": false, "message": "User Updateeeedddddd Faileddddddd" });
     }
}

var getChatDataUpdateControllerFn = async (req, res) =>
{
    
    var result = await userService.updateChatDBService(req.params.id,req.body);
    
     if (result) {
        res.send({ "status": true, "message": "User Updateeeedddddd"} );
     } else {
         res.send({ "status": false, "message": "User Updateeeedddddd Faileddddddd" });
     }
}

module.exports = { createUserControllerFn,getEmailDataConntrollerfn, 
    getDataConntrollerfn, createChatConntrollerfn, getChatControllerFn,
    getSingleChatControllerFn, getDataUpdateControllerFn, getChatDataUpdateControllerFn }