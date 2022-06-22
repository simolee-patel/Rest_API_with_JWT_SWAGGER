const jwtToken = require("../Validation/jwt_validation")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { successResponse, errorResponse } = require("../Validation/response/response")
const httpStatus = require('http-status')
const response_message = require("../Validation/response/response-message");
const userRepository = require('../repository/user.repository');


module.exports = {
    signUp: async function (req) {
        console.log("requested data", req.body)

        req.body.password = await bcrypt.hash(req.body.password, 10);
        var userData = await userRepository.addUser(req.body);
        try {
            if (userData) {
                let token = jwtToken.generateToken({ username: userData.username, email: userData.email })
                userData.token = token
                console.log("data", userData)
                return successResponse(httpStatus.OK, response_message.success, userData)
            }
        } catch (error) {
            return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.serverError)
        }
    },

    logIn: async function (req) {
        console.log("requested data", req.body)
        try {
            const { email, password } = req.body;
            if (!(email && password)) {
                return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.enterRequiredField)
            }
            let user = await userRepository.findByEmail(email)
            console.log("user", user)
            if (user && (await bcrypt.compare(password, user.password))) {
                let token = await jwtToken.generateToken({ username: user.username, email: user.email })
                user.token = token;
                return successResponse(httpStatus.OK, response_message.success, user)
            }
            return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.invalidCredentials)
        }
        catch {
            return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.invalidCredentials)
        }
    },

    autoLogin: async function (req) {
        console.log("requested data", req.body)
        try {
            const { token } = req.body;
            if (!(token)) {
                return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.enterRequiredField)
            }
            try {
                let token = await jwtToken.verifyToken(req.body.token)
                console.log("adata ", token, process.env.JWT_SECRET_KEY)
                if (token) {
                    let data = jwt.verify(req.body.token, process.env.JWT_SECRET_KEY)
                    return successResponse(httpStatus.OK, response_message.success, data)
                }
                else {
                    return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.tokenExpired)
                }
            }
            catch (error) {
                return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.tokenExpired)
            }
        }
        catch {
            return errorResponse(httpStatus.INTERNAL_SERVER_ERROR, response_message.serverError)
        }
    }
}