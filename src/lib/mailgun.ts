const formData = require('form-data');

import Mailgun from 'mailgun.js'
const mailgun = new Mailgun(formData);

export const mg = mailgun.client({
	username: 'api',
	key: process.env.NEXT_PUBLIC_MAILGUN_KEY!,
});
