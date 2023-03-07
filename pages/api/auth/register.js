import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "d9a58c4d2b35f0",
        pass: "ad45c82645632d"
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

            // generate activation link
            const activationLink = `http://localhost:3000/activate?token=${newUser.activationToken}`;

            // send activation email
            const info = await transport.sendMail({
                from: 'noreply@example.com',
                to: email,
                subject: 'Activate your account',
                html: `<p>Thank you for creating an account.</p>
                <p>Please click the following link to activate your account:</p>
                <p><a href="${activationLink}">${activationLink}</a></p>
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
