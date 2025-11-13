import React, { useEffect, useState } from "react";
import { BookA, NotebookPen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { use } from "react";
import { toggleAddBookPopup, toggleReadBookPopup, toggleRecordBookPopup } from "../store/slices/popUpSlice";
import { toast } from "react-toastify";
import { fetchAllBorrowedBooks, resetBorrowSlice } from "../store/slices/borrowSlice";
import { fetchAllBooks, resetBookSlice } from "../store/slices/bookSlice";
import Header from "../layout/Header";
import { RiH3 } from "react-icons/ri";
import  AddBookPopup from "../popups/AddBookPopup"
import  ReadBookPopup from "../popups/ReadBookPopup"
import  RecordBookPopup from "../popups/RecordBookPopup"

const BookManagement = () => {

  const dispatch = useDispatch();

  const { books, loading, error, message } = useSelector((state) => state.book);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const { settingPopup,
    addBookPopup,
    readBookPopup,
    recordBookPopup,
  } = useSelector((state) => state.popup);

  const { loading: borrowSliceLoading,
    error: borrowSliceError,
    message: borrowSliceMessage, } = useSelector((state) => state.borrow);

  const [readBook, setReadBook] = useState(false);

  const openReadPopup = (id) => {
    const book = books.find((book) => book._id === id);
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  }
  const [borrowBookId, setBorrowBookId] = useState(false);
  const openRecordBookPopup= (bookId) => {
    setBorrowBookId(bookId);
    dispatch(toggleRecordBookPopup());
  };

  useEffect(() => {
    if (message || borrowSliceMessage) {
      toast.success(message || borrowSliceMessage);
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBooks());
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
    if (error || borrowSliceError) {
      toast.error(error || borrowSliceError);
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
  }, [dispatch, error, message, loading, borrowSliceMessage, borrowSliceError, borrowSliceLoading]);


  const [searchedKeyword, setSearchedKeyword] = useState("");

  const handleSearch = (e) => {
    setSearchedKeyword(e.target.value.toLowerCase());
  };

  const searchedBooks = books.filter((book) => {
   book.title.toLowerCase().includes(searchedKeyword);
  });

  return <>
    <main className="p-6 relative flex-1 pt-28">
      <Header />
      {/* sub header */}
      <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <h2 className="text-xl font-medium md:text-2xl md:font-semibold">{user && user.role === "Admin" ? "Book Management" : "Books"}</h2>

        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          {isAuthenticated && user.role === "Admin" && (
            <button onClick={() => dispatch(toggleAddBookPopup())} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
              <span className="bg-white flex justify-center items-center overflow-hidden rounded-full text-black w-[25px] text-[27px] absolute left-5">+</span>
              Add Book</button>
          )}

          <input type="text" placeholder="Search by title or author" value={searchedKeyword} onChange={handleSearch} className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </header>
      {/* Table */}


      {
        books && books.length > 0 ? (
          <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
            <table className="min-w-full border-collapse">
              <thead >
                <tr className="bg-gray-200">
                  <th className="text-left p-2 px-2 border-b">Id</th>
                  <th className="text-left p-2 px-2  border-b">Name</th>
                  <th className="text-left p-2 px-2  border-b">Author</th>
                  {
                    isAuthenticated && user.role === "Admin" && (
                      <th className="text-left p-2 border-b">Quantity</th>
                    )}
                  <th className="text-left p-2 px-2  border-b">Price</th>
                  <th className="text-left p-2  px-2 border-b">Abailability</th>
                  {
                    isAuthenticated && user.role === "Admin" && (
                      <th className="text-left p-2 border-b">Record Book</th>
                    )}

                </tr>
              </thead>

              <tbody>
                {
                  searchedBooks.map((book, index) => {
                    <tr key={book._id} className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2"> {book.title}</td>
                      <td className="px-4 py-2"> {book.author}</td>
                      {
                        isAuthenticated && user.role === "Admin" && (
                          <td className="px-4 py-2">{book.quantity}</td>
                        )}
                      <td className="px-4 py-2"> {`$${book.price}`}</td>
                      <td className="px-4 py-2"> {book.availability ? "available" : "Unavailable"}</td>
                      {
                        isAuthenticated && user.role === "Admin" && (
                          <td className="px-4 py-2 flex space-x-2 my-3 justify-center" >
                            <BookA onClick={()=>openReadPopup(book._id)} />
                              <NotebookPen onClick={()=>openRecordBookPopup(book._id)}/>
                          </td>
                        )}
                    </tr>
                  })
                }
              </tbody>


            </table>
          </div>
        ) : (
          <h3 className="text-3xl mt-5 font-medium"> No Bokks found in library </h3>
        )
      }

    </main>
 {addBookPopup && < AddBookPopup/>}
  {readBookPopup && < ReadBookPopup book={readBook}/>}
   {recordBookPopup && < RecordBookPopup bookId={borrowBookId}/>}


  </>;
};

export default BookManagement;
