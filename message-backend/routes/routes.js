var express = require('express');
 
const router = express.Router();

var userController = require('../src/home/userController');

router.route('/Users/add').post(userController.createUserControllerFn);
router.route('/Users/email/:email').get(userController.getEmailDataConntrollerfn);
router.route('/Users/getAll').get(userController.getDataConntrollerfn);
router.route('/Users/update/:id').patch(userController.getDataUpdateControllerFn);

router.route('/Chats/add').post(userController.createChatConntrollerfn);
router.route('/Chats/getAll').get(userController.getChatControllerFn);
router.route('/Chats/roomID/:roomID').get(userController.getSingleChatControllerFn);
router.route('/Chats/update/:id').patch(userController.getChatDataUpdateControllerFn);

module.exports = router