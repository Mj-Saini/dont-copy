import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const body = await req.json();

        // Nodemailer SMTP Transporter बनाएं
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // true for 465, false for 587 (TLS)
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email Options
        let mailOptions = {
            from: `"Website Contact" <${process.env.SMTP_USER}>`,
            to: process.env.EMAIL_TO,
            subject: "New Form Submission",
            text: `
                First Name: ${body.firstName}
                Last Name: ${body.lastName}
                Email: ${body.email}
                Mobile No: ${body.mobileNo}
                Submitted At: ${new Date().toLocaleString()}
            `,
        };

        // Email भेजें
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);

        return Response.json({ message: "Email sent successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return Response.json({ message: "Error sending email", error }, { status: 500 });
    }
}
