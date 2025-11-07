import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Book from "../models/bookModel.js";
import User  from "../models/userModel.js";
import ErrorHandler  from "../middlewares/errorMiddleware.js";
import Borrow  from "../models/borrowModel.js";
import calculateFine from "../utils/fineCalculator.js";

export const recordBorrowBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { email } = req.body;

  const book = await Book.findById(id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }

  const user = await User.findOne({ email, accountVerified: true });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (book.quantity == 0) {
    return next(new ErrorHandler("Book not available", 400));
  }

  const isalreadyBorrowed = user.borrowedBooks.find(
    (b) => b.bookId.toString() === id && b.returned === false
  );
  if (isalreadyBorrowed) {
    return next(new ErrorHandler("Book is already borrowed", 400));
  }
  book.quantity -= 1;
  book.availability = book.quantity > 0;
  await book.save();

  user.borrowedBooks.push({
    bookId: book._id,
    bookTitle: book.title,
    borrowDate: new Date(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  });
  await user.save();

  console.log("Creating borrow record for user:", user.email, "and book:", book.title);
 const borrowRecord = await Borrow.create({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
      book: book._id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      price: book.price,
  });
 
  console.log("Borrow record created:", borrowRecord);

  res.status(200).json({
    success: true,
    message: "Book borrowed recorded successfully",
   
  });
});

// Return Borrowed Book
export const returnBorrowBook = catchAsyncErrors(async (req, res, next) => {
  const { bookId } = req.params;
  const { email } = req.body;

  const book = await Book.findById(bookId);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  const user = await User.findOne({ email, accountVerified: true });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const borrowBook = user.borrowedBooks.find(
    (b) => b.bookId.toString() === bookId && b.returned === false
  );
  if (!borrowBook) {
    return next(new ErrorHandler("Book is not borrowed", 400));
  }
  borrowBook.returned = true;
  // borrowBook.returnDate = new Date();
  await user.save();
  book.quantity += 1;
  book.availability = book.quantity > 0;
  await book.save();

  const borrow = await Borrow.findOne({
   // user: { id: user._id, email: user.email },
   "user.email": email ,
    book: bookId ,
    returnDate: null,
  }); 
  if (!borrow) {
    return next(new ErrorHandler("Borrow record not found", 404));
  }
  borrow.returnDate = new Date();

  // const fine = calculateFine(borrow.dueDate, borrow.returnDate);
  const fine  = calculateFine(borrow.dueDate);
  borrow.fine = fine;
  await borrow.save();

  res.status(200).json({
    success: true,
    message: fine !==0 ? `Book returned successfully. the total charge including fine is $${fine + book.price}` : `Book returned successfully. The Total Charge are $${book.price}`,
  });

});


export const borrowBooks = catchAsyncErrors(async (req, res, next) => {

  const {borrowedBooks} = req.user;

  res.status(200).json({
    success: true,
    borrowedBooks
  });

  
});



export const getBorrowedBooksForAdmin = catchAsyncErrors(
  async (req, res, next) => {

    const borrowedBooks = await Borrow.find();

  res.status(200).json({
    success: true,
    borrowedBooks
  });




});