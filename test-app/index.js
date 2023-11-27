const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173' // Adjust as per your client application URL
}));

app.use(express.json());

app.post('/api/authorize/verifyToken', async (req, res) => {
    const { token } = req.body;
    
    console.log("Received token:", token);

    try {
        // Make a request to the SSO provider's getMe endpoint
        // Ensure the URL is correct and points to your SSO app
        const ssoResponse = await axios.get('http://localhost:5000/api/auth/getMe', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log(ssoResponse.data)


        // Assuming the response contains the user data
        const userData = ssoResponse.data;
        // Respond with the user data
        res.json({ valid: true, userData: userData });
    } catch (error) {
        if (error.response) {
            // The server responded with a status code outside the range of 2xx
            res.status(error.response.status).json({ message: error.response.data });
        } else {
            // Something else triggered the error
            res.status(500).json({ message: error.message });
        }
    }
});

app.get('/', async (req, res) => {
    try {
        // Use a valid token here
        const token = 'your-valid-token';

        const response = await axios.get('http://localhost:5000/api/auth/getMe', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const userData = response.data;

        res.send("hello");
    } catch (error) {
        res.status(500).send("Failed to load user data");
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Test app listening on port ${PORT}`);
});