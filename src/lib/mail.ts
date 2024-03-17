import { Resend } from "resend";

// This Lib is used to send email. (Use Resend SMTP Service)

const resend = new Resend(process.env.REACT_APP_RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string, 
    token: string
  ) => {
        const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

        await resend.emails.send({
            from: "ChanceTixService@resend.dev",
            to: email,
            subject: "Confirm your email",
            html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
        })
    }