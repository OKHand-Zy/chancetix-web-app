import { Resend } from "resend";

// This Lib is used to send email. (Use Resend SMTP Service)

const resend = new Resend(process.env.REACT_APP_RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string
) => {
  await resend.emails.send({
    from: "ChanceTixService@resend.dev",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code is ${token}.</p>`,
  })
}

export const sendPasswordResetEmail = async (
  email: string,
  token: string
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "ChanceTixService@resend.dev",
    to: email,
    subject: "Reset your email",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
};

export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "ChanceTixService@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
  });
};
