import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  MAIL_SERVICE_CLIENT_ID,
  MAIL_SERVICE_CLIENT_SECRET,
  MAIL_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2({
  MAIL_SERVICE_CLIENT_ID,
  MAIL_SERVICE_CLIENT_SECRET,
  MAIL_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND,
});

const sendEmail = (to, url, txt, type) => {
  oauth2Client.setCredentials({
    refresh_token: MAIL_SERVICE_REFRESH_TOKEN,
  });

  const accessToken = new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) console.log(err);
      else resolve(token);
    });
  });
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAIL_SERVICE_CLIENT_ID,
      clientSecret: MAIL_SERVICE_CLIENT_SECRET,
      refreshToken: MAIL_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: `${txt} || Twitter`,
    html: `
				 <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
				 <h2 style="text-align: center; text-transform: uppercase;color: teal;">
				 		${type === "reset_password" ? "Reset password" : "Welcome to Twitter"}
				 </h2>
				 <p>
				 		${
              type === "verify_email"
                ? "Congratulations! You're almost set to start using Twitter."
                : ""
            }
					  Just click the button below <span style="text-transform: lowercase">${txt}</span>.
				 </p>
				 
				 <a href=${url} style="background: #1d9bf0; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
			
				 <p>If the button doesn't work for any reason, you can also click on the link below:</p>
			
				 <div>${url}</div>
				 </div>
			`,
  };

  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    return info;
  });
};

export default sendEmail;
