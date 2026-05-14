import cron from 'node-cron';
import nodemailer from 'nodemailer';
import prisma from '../prisma';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Fallback for basic usage
  auth: {
    user: process.env.EMAIL_USER || 'test@example.com',
    pass: process.env.EMAIL_PASS || 'password',
  },
});

export const startScheduler = () => {
  // Run daily at 8:00 AM
  cron.schedule('0 8 * * *', async () => {
    console.log('Running daily subscription check...');

    try {
      const today = new Date();
      // Look for subscriptions expiring in exactly 7, 3, 1, or 0 days
      const targetDays = [7, 3, 1, 0];

      for (const days of targetDays) {
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + days);

        const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

        const expiringSubscriptions = await prisma.subscription.findMany({
          where: {
            expiryDate: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
          include: { user: true },
        });

        for (const sub of expiringSubscriptions) {
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: sub.user.email,
            subject: `Reminder: Your ${sub.provider} subscription is expiring soon!`,
            text: `Hello ${sub.user.name || 'User'},\n\nThis is a reminder that your ${sub.provider} subscription (Plan: ${sub.planName || 'N/A'}) will expire on ${sub.expiryDate.toDateString()}.\n\nPlease renew it to avoid service interruption.\n\nThank you,\nRenewFlow Team`,
          };

          try {
            await transporter.sendMail(mailOptions);
            console.log(`Reminder sent to ${sub.user.email} for ${sub.provider}`);
          } catch (err) {
            console.error(`Failed to send email to ${sub.user.email}:`, err);
          }
        }
      }
    } catch (error) {
      console.error('Error in scheduler:', error);
    }
  });

  console.log('Scheduler started.');
};
