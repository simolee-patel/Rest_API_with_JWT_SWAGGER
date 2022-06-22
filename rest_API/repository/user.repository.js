
const userSchema = require('../database/schemas/user.schema')
module.exports = {
    addUser: async function (userData) {
        const user = new userSchema(userData);
        var userData = await user.save();
        return userData ? userData : null

    },
    findByEmail: async function (email) {
        var userData = await userSchema.find({ email })
        return userData ? userData : null

    }
}