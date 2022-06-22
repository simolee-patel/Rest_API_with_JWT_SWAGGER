const express = require("express");
const userRoute = require("./routes/user.route");
const db = require("./database/index")
require('dotenv').config();
const app = express()
const port = process.env.PORT;
const router = express.Router();
require("./routes/user.route")(router)
const bodyParser = require('body-parser');
const swaggerJsDocs = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

const options = {

    definition: {
        openapi: "3.0.0",
        info: {
            title: "registration API",
            version: "1.0.0",
            description: "Basic registration API",
            servers: [
                {
                    url: "http://localhost:3000",
                },
            ],
        },
    },
    apis: ["./routes/*.js"], // files containing annotations as above
};

const swaggerDocs = swaggerJsDocs(options)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);




// app.get("/", (req, res) => {
//     res.send("this is PRO")
// })

app.listen(port, () => {
    console.log("app is listen on port", port)
})