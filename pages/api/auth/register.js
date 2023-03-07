import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const prisma = new PrismaClient();
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "2ec53bf680fa38",
        pass: "6f0d984ea7545e"
    }
});

export default async function userHandler(req, res) {
    const { method } = req;

    switch (method) {
        case 'POST':
            const { pseudo, email, password } = req.body;
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                return res.status(422).json({ message: 'User is already registered' });
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            //new user
            const newUser = await prisma.user.create({
                data: {
                    pseudo,
                    email,
                    password: hashedPassword,
                },
            });

            // generate activation token
            const verificationToken = crypto.randomBytes(20).toString('hex');

            // store verification token in database
            await prisma.verificationToken.create({
                data: {
                    identifier: newUser.id,
                    token: verificationToken,
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //24 hours
                },
            });

            // generate activation link
            const activationLink = `${process.env.BASE_URL}/api/auth/activate?token=${verificationToken}`;
            // send activation email
            const info = await transport.sendMail({
                from: 'noreply@example.com',
                to: email,
                subject: 'Activate your account',
                html: `<p>Thank you for creating an account.</p>
                <p>Please click the following link to activate your account:</p>
                <p><a href="${activationLink}">${activationLink}</a></p>
                <p>And Just Enjoy ! 🫡</p>
                `,
            });
            console.log("Message sent: %s", info.messageId);

            res.status(201).json({ message: 'User created successfully' });

            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
