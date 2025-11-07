import cron from 'node-cron';
import User from '../models/userModel.js';

export const removeUnverifiedAccounts = () => {
  // Schedule the task to run every 5 minutes

  cron.schedule('*/5 * * * *', async () => {
    try {
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000); // 30 minutes ago

      await User.deleteMany({
        accountVerified: false,
        createdAt: { $lt: thirtyMinutesAgo }
      });
    } catch (error) {
      console.error('Error removing unverified accounts:', error);
    }
  });
};
