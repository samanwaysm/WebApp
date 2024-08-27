const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller')

// const middleware = require('../middleware/middleware')

route.get('/',services.homeRoute)
route.get('/login',services.loginRoute)
route.get('/register',services.registerRoute)


route.post('/api/login',controller.loginUser) 
// route.post('/api/logout',controller.userLogout) 
route.post('/api/register',controller.registerUser)

route.get("/api/users", controller.loadUsers);
route.get("/api/users/:id", controller.getUserById);
route.delete("/api/users/:id", controller.deleteUser);
route.post('/api/update', controller.updateUser);

module.exports = route