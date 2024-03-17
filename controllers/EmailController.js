import nodemailer from 'nodemailer'
import { OAuth2Client } from 'google-auth-library'

// https://trungquandev.com/nodejs-viet-api-gui-email-voi-oauth2-va-nodemailer/
// --
// nếu token_refresh của bạn bị hết hạn thì zô lại link sau và xin cấp lại token
// --
// https://developers.google.com/oauthplayground/



// const CLIENT_ID = ''
// const CLIENT_SECRET = ''
// const REFRESH_TOKEN = ''
// const ADMIN_EMAIL_ADDRESS = ''

const generateMessage = (randomNumber) => {
  return `
  <div style="text-align: center; background-color: rgb(123, 187, 226); padding: 50px;">
    <div style="background-image: url('https://i.pinimg.com/originals/88/e3/94/88e3941bd4f4b25313f6fbe375114605.jpg'); width: 700px;
    height: 200px; background-size: cover; background-position: center; margin: 0 auto;"></div>
    <h1>Please enter the following code for verification</h1>
    <div style="font-size: 50px; background-color: rgb(41, 156, 129); padding-block: 20px; margin: 0px 50px 30px;">
      <strong>${randomNumber}</strong>
    </div>
    <div style="font-size: 30px; color: rgb(4, 72, 18);"> Thank you ! </div>
  </div>
    `;
};


const myOAuth2Client = new OAuth2Client(
  CLIENT_ID,
  CLIENT_SECRET
)

myOAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
})

export const sendEmailAuth = async(req, res, next) => {
    try{
        const myAccessTokenObject = await myOAuth2Client.getAccessToken()
        const myAccessToken = myAccessTokenObject?.token

        const transport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: ADMIN_EMAIL_ADDRESS,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refresh_token: REFRESH_TOKEN,
            accessToken: myAccessToken
          }
        })
        
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;
        const message = generateMessage(randomNumber);
        const mailOptions = {
          to: req.body.email, 
          subject: "Verify your identity", 
          html: message
        }

        await transport.sendMail(mailOptions)
        res.status(200).json({ message: 'Email sent successfully.' })
      } catch (error) {
        console.log(error)
        res.status(500).json({ errors: error.message })
      }
}

export const sendEmail = async (req, res, next) => {
    try {
        const { email, subject, content } = req.body
        if (!email || !subject || !content) throw new Error('Please provide email, subject and content!')
        const myAccessTokenObject = await myOAuth2Client.getAccessToken()
        const myAccessToken = myAccessTokenObject?.token

        const transport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: ADMIN_EMAIL_ADDRESS,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refresh_token: REFRESH_TOKEN,
            accessToken: myAccessToken
          }
        })

        const mailOptions = {
          to: email, 
          subject: subject, 
          html: `<h3>${content}</h3>`
        }

        await transport.sendMail(mailOptions)
        res.status(200).json({ message: 'Email sent successfully.' })
      } catch (error) {
        console.log(error)
        res.status(500).json({ errors: error.message })
      }
};
