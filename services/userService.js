// controllers/exampleController.js
const userservice = require('./userService');

const getSignup = async (req, res) => {
    try {
        const data = await userservice.getDataFromAPI();
        const processedData = userservice.processData(data);
    } catch (error) {
        console.error(error);

        if (error.response && error.response.status === 400) {
            res.status(400).send('Bad Request');
            return;
        }

        res.status(500).send('An error occurred');
    }
};


module.exports = {
    getSignup,
    getSignin 
    forgetPassword
    
}