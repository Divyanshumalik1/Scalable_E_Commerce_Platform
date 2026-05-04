import { sendEmail } from '../../services/email.service.js';

export const handleUserCreated = async (data) => {
    const { email, username } = data;

    await sendEmail({
        to: email,
        subject: 'Welcome to ShopFlow! 🎉',
        html: `
            <h2>Welcome, ${username}!</h2>
            <p>Your account has been created successfully.</p>
            <p>Start shopping at <a href="${process.env.STORE_URL}">ShopFlow</a>.</p>
        `,
    });
};