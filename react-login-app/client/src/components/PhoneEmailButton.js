import React, { useEffect } from 'react';

const PhoneEmailButton = () => {
    useEffect(() => {
        // Load the Phone.Email script dynamically
        const loadScript = () => {
            const script = document.createElement('script');
            script.src = 'https://www.phone.email/sign_in_button_v1.js';
            script.async = true;
            document.body.appendChild(script);

            // Define the phoneEmailListener function
            window.phoneEmailListener = (userObj) => {
                const { user_json_url } = userObj;

                // Send user_json_url to your backend to retrieve user info
                fetch('/api/phone-email/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_json_url }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success) {
                            alert(`Phone verification successful! Verified phone number: ${data.phoneNumber}`);
                        } else {
                            alert('Phone verification failed.');
                        }
                    })
                    .catch((error) => {
                        console.error('Error verifying phone:', error);
                    });
            };
        };

        loadScript();
    }, []);

    return (
        <div id="signInContainer" className="container">
            <div className="pe_signin_button" data-client-id="17614578121293813582"></div>
        </div>
    );
};

export default PhoneEmailButton;