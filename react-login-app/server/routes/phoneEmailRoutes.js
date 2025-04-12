const express = require('express');
const https = require('https');
const router = express.Router();

router.post('/verify', (req, res) => {
    const { user_json_url } = req.body;

    if (!user_json_url) {
        return res.status(400).json({ success: false, message: 'user_json_url is required' });
    }

    https.get(user_json_url, (response) => {
        let data = '';

        // A chunk of data has been received.
        response.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received.
        response.on('end', () => {
            try {
                const jsonData = JSON.parse(data);

                // Extract user details
                const user_country_code = jsonData.user_country_code;
                const user_phone_number = jsonData.user_phone_number;
                const user_first_name = jsonData.user_first_name;
                const user_last_name = jsonData.user_last_name;

                console.log('User Country Code:', user_country_code);
                console.log('User Phone Number:', user_phone_number);
                console.log('User First Name:', user_first_name);
                console.log('User Last Name:', user_last_name);

                // Respond with the verified phone number
                res.status(200).json({
                    success: true,
                    phoneNumber: user_phone_number,
                    countryCode: user_country_code,
                    firstName: user_first_name,
                    lastName: user_last_name,
                });
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).json({ success: false, message: 'Error parsing JSON response' });
            }
        });
    }).on('error', (err) => {
        console.error('Error fetching user JSON:', err.message);
        res.status(500).json({ success: false, message: 'Error fetching user JSON' });
    });
});

module.exports = router;