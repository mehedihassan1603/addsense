import React from 'react';

const SMS = () => {
    return (
        <div>
            <form action="/send-sms" method="post">
                <label htmlFor="toNumber">To:</label>
                <input type="text" id="toNumber" name="toNumber" placeholder="Recipient phone number" required />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" rows="4" placeholder="Enter your message" required></textarea>

                <input type="submit" value="Send SMS" />
            </form>
        </div>
    );
};

export default SMS;
