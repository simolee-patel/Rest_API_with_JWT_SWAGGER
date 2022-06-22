const userController = require("../controller/user.controller");
const { authenticateJWT } = require("../middleware/auth")

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Unique name of user
 *         email:
 *           type: string
 *           description: email of user
 *         password:
 *           type: string
 *           description: password if user
 *         token:
 *           type: string
 *           description: Unique token generated by server
 *       example:
 *         username: abc12
 *         email: abc12@gmail.com
 *         password: 1223sfsf
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGVfbm8iOiIxMjM0NTY3ODUyIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsImRldmljZV9pZCI6ImRpZDEyMzQ1Njc4OTAi...

 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API which manage all user related operation
 */


module.exports = function (router) {
    /**
     * @swagger
     * /sign_up:
     *   post:
     *     summary: Create a new User
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       200:
     *         description: The User was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       500:
     *         description: Some server error
     */
    router.post('/sign_up', function (req, res) {
        console.log('data', req)
        return userController.signUp(req).then(response => {
            return res.status(response.status).send(response);
        })
    });

    /**
     * @swagger
     * /log_in:
     *   post:
     *     summary: Create a new User
     *     tags: [Users]
     *     requestBody:
     *       content:
     *         application/x-www-form-urlencoded:
     *           schema:
     *              type: object
     *              properties:
     *                 email:
     *                   type: string
     *                 password:
     *                   type: string
     *     responses:
     *       200:
     *         description: The User was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       500:
     *         description: Some server error
     */
    router.post('/log_in', function (req, res) {
        console.log('data in login', req.body)
        return userController.logIn(req).then(response => {
            return res.status(response.status).send(response)
        })
    });


    /**
     * @swagger
     * /auto_login:
     *   post:
     *     summary: Create a new User
     *     tags: [Users]
     *     requestBody:
     *       content:
     *         application/x-www-form-urlencoded:
     *           schema:
     *              type: object
     *              properties:
     *                 token:
     *                   type: string
     *     responses:
     *       200:
     *         description: The User was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       500:
     *         description: Some server error
     */
    router.post('/auto_login', function (req, res) {
        console.log('data', req.body)
        return userController.autoLogin(req).then(response => {
            return res.status(response.status).send(response)
        })
    });

    router.post('/welcome', authenticateJWT, function (req, res) {
        console.log("data")
        return res.status(200).send("welcomeee")
    });
}