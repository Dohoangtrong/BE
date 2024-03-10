import nodemailer from 'nodemailer'
import { OAuth2Client } from 'google-auth-library'

//https://trungquandev.com/nodejs-viet-api-gui-email-voi-oauth2-va-nodemailer/






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
        const mailOptions = {
          to: req.body.email, 
          subject: "Verify your identity", 
          html: 
          `
            <h1>Please enter the following code for verification:</h1>
            <h3>${randomNumber}</h3>
          `
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
        // Lấy thông tin gửi lên từ client qua body
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
