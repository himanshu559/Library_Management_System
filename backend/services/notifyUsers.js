import cron from 'node-cron';
import Borrow from '../models/borrowModel.js';
import User from '../models/userModel.js';
import sendEmail from '../utils/sendEmail.js';
export const notifyUsers = () => {
  // Schedule the task to run every 2 minutes
  cron.schedule("*/30 * * * * *", async () => {
  try {
    
 const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago

  const borrows = await Borrow.find({
    dueDate: { $lt: oneDayAgo },
    returnDate: null,
    notified: false
  });

  for(const element of borrows) {
    // Notify the user about the overdue book
    
    if(element.user && element.user.email) {
      const user = await User.findById(element.user.id);

  sendEmail({
    email: user.email,
    subject: "Book Return Reminder",
    message: `Dear ${element.user.name},\n\nThis is a reminder that the book you borrowed is overdue. Please return it as soon as possible to avoid further fines.\n\nThank you,\nLibrary Management`
  });

  // Mark the borrow record as notified
  element.notified = true;
  await element.save();
  console.log(`User ${element.user.email} notified about overdue book.`);
    }
  }
 } catch (error) {
    console.error("Error notifying users about overdue books:", error);
  }
  });
  };
