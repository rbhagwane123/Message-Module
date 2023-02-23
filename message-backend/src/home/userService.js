var userModel = require('./userModel');
var chatModel = require('./chatModel');

module.exports.createChatDBService = (chatDetails) => {
 
    return new Promise(function myFn(resolve, reject) {
        var chatModelData = new chatModel();
        // console.log(chatDetails.chats.user);
        
        chatModelData.roomId = chatDetails.roomId;
        chatModelData.chats = chatDetails.chats;
        // chatModelData.chats = chatDetails.chats;

        try{
            chatModelData.save(function resultHandle(error, result) {
                if (error) {
                    reject(false);
                } else {
                    resolve(true);
                }
            });
        }
        catch(error){
            console.log(error);
        }
    });
}


module.exports.updateUserDBService = (id,userDetails) => {    
    console.log(userDetails);
    return new Promise(function myFn(resolve, reject) {
        userModel.findByIdAndUpdate(id,userDetails, function returnData(error, result) {
          if(error)
          {
                reject(false);
          }
          else
          {
             resolve(result);
          }
        });
    });
}

module.exports.updateChatDBService = (id,userDetails) => {    
    // console.log(userDetails);
    return new Promise(function myFn(resolve, reject) {
        chatModel.findByIdAndUpdate(id,userDetails, function returnData(error, result) {
          if(error)
          {
                reject(false);
          }
          else
          {
             resolve(result);
          }
        });
    });
}



module.exports.getChatFromDBService = () => {
 
    return new Promise(function checkURL(resolve, reject) {
        chatModel.find({}, function returnData(error, result) {
            if (error) {
                reject(false);
            } else {
                resolve(result);
            }
        });
    });
}


module.exports.getEmailDataFromDBService = (email) => {
    return new Promise(function checkURL(resolve, reject) {
        try{
            
            userModel.find({email:email}, function returnData(error, result) {
                if (error) {
                    reject(false);
                } else {
                    resolve(result);
                }
            });
        }
        catch(error){
            console.log(error);
        }
    });
}

module.exports.getChatRoomDataFromDBService = (roomID) => {
    return new Promise(function checkURL(resolve, reject) {
        try{
            
            chatModel.find({roomId:roomID}, function returnData(error, result) {
                if (error) {
                    reject(false);
                } else {
                    resolve(result);
                }
            });
        }
        catch(error){
            console.log(error);
        }
    });
}

module.exports.getDataFromDBService = () => {
 
    return new Promise(function checkURL(resolve, reject) {
        userModel.find({}, function returnData(error, result) {
            if (error) {
                reject(false);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports.createUserDBService = (userDetails) => {
 
    return new Promise(function myFn(resolve, reject) {
        var userModelData = new userModel();
        // console.log(userDetails.document);
        
        userModelData.name = userDetails.name;
        userModelData.email = userDetails.email;
        userModelData.password = userDetails.password;
        userModelData.phone = userDetails.phone;
        userModelData.status = userDetails.status;
        userModelData.image = userDetails.image;

        try{
            userModelData.save(function resultHandle(error, result) {
                if (error) {
                    reject(false);
                } else {
                    resolve(true);
                }
            });
        }
        catch(error){
            console.log(error);
        }
    });
}

