import React from "react";
import logo_with_title from "../assets/logo-with-title.png";
import logoutIcon from "../assets/logout.png";
import closeIcon from "../assets/white-close-icon.png";
import dashboardIcon from "../assets/element.png";
import bookIcon from "../assets/book.png";
import catalogIcon from "../assets/catalog.png";
import settingIcon from "../assets/setting-white.png";
import usersIcon from "../assets/people.png";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent }) => {
  const dispatch = useDispatch();
   const {addNewAdminPopup} = useSelector(state => state.popup);
  const { loading, error, message, user, isAuthenticated } = useSelector(state => state.auth);
  const handlelogout = () => {
    dispatch(logout());
  }
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
    dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading, message]);
  return (
    <>
      <aside className={`${isSideBarOpen ? "left-0 " : "-left-full"} z-10 transition-all duration-700 md:relative md:left-0 flex w-64 bg-black text-white flex-col h-full `}
        style={{ position: "fixed" }}
      >
        <div className="px-6 py-4 my-8" >
          <img src={logo_with_title} alt="logo" />
        </div>

        <nav className="flex-1 px-6 space-y-2">
          <button className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Dashboard")}>
            <img src={dashboardIcon} alt="dashboardIcon" />
            <span>Dashboard</span>
          </button>
          <button className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Books")}>
            <img src={bookIcon} alt="Books" />
            <span>Books</span>
          </button>

          {/* {
            isAuthenticated && user?.role === "Admin" && (
              <> */}
                <button className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Catalog")}>
                  <img src={catalogIcon} alt="catalog" />
                  <span>Catalog</span>
                </button>
                <button className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Users")}>
                  <img src={usersIcon} alt="users" />
                  <span>Users</span>
                </button>
                <button className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" >

                  {/* onClick={() => setSelectedComponent("Users")}> */}
                  {/* <img src={usersIcon} alt="users" />
                <span>Users</span> */}

                  <RiAdminFill className="w-6 h-6" /> <span>Add New Admin</span>

                </button>
              {/* </> */}
            {/* ) */}
          {/* } */}

          {
            isAuthenticated && user?.role === "User" && (
              <>
                <button className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("My Borrowed Book")}>
                  <img src={catalogIcon} alt="Borrow book Icon" />
                  <span>My Borrowed Books</span>
                </button>
              </>
            )
          }

          <button className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2">

            {/* onClick={() => setSelectedComponent("My Borrowed Book")} */}
            <img src={settingIcon} alt="Borrow book Icon" />
            <span>Upadate Credentials</span>
          </button>

        </nav>
        <div className="px-6 py-6">
          <button className="py-2 font-medium text-center bg-transparent rounded-md hover:cursor-pointer flex justify-center items-center space-x-5 mx-auto w-fit" onClick={handlelogout}> 

          <img src={logoutIcon} alt="logout icon" /><span>LogOut</span>

        </button>
        </div>
       <img src={closeIcon} alt="closeIcon"  onClick={()=>setIsSideBarOpen(!isSideBarOpen)} className="h-fit w-fit absolute top-0 right-4 mt-4 block md:hidden"/>

      </aside >
     { addNewAdminPopup && <AddNewAdmin/>}
    </>
  );
};

export default SideBar;


// import logo_with_title from "../assets/logo-with-title.png";
// import logoutIcon from "../assets/logout.png";
// import closeIcon from "../assets/white-close-icon.png";
// import dashboardIcon from "../assets/element.png";
// import bookIcon from "../assets/book.png";
// import catalogIcon from "../assets/catalog.png";
// import settingIcon from "../assets/setting-white.png";
// import usersIcon from "../assets/people.png";
// import { RiAdminFill } from "react-icons/ri";
// import { useDispatch, useSelector } from "react-redux";
// import { logout, resetAuthSlice } from "../store/slices/authSlice";
// import { toast } from "react-toastify";

// const SideBar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent }) => {
//   const dispatch = useDispatch();

//   const { addNewAdminPopup } = useSelector((state) => state.popup);
//   const { loading, error, message, user, isAuthenticated } = useSelector(
//     (state) => state.auth
//   );

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(resetAuthSlice());
//     }
//     if (message) {
//       toast.success(message);
//       dispatch(resetAuthSlice());
//     }
//   }, [dispatch, error, message]);

//   return (
//     <aside
//       className={`${
//         isSideBarOpen ? "left-0" : "-left-full"
//       } z-10 transition-all duration-700 md:relative md:left-0 flex w-64 bg-black text-white flex-col h-full fixed`}
//     >
//       {/* Logo Section */}
//       <div className="px-6 py-4 my-8">
//         <img src={logo_with_title} alt="logo" />
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-6 space-y-2">
//         <button
//           onClick={() => setSelectedComponent("Dashboard")}
//           className="w-full py-2 font-medium bg-transparent rounded-md hover:bg-gray-800 flex items-center space-x-2"
//         >
//           <img src={dashboardIcon} alt="dashboard" />
//           <span>Dashboard</span>
//         </button>

//         <button
//           onClick={() => setSelectedComponent("Books")}
//           className="w-full py-2 font-medium bg-transparent rounded-md hover:bg-gray-800 flex items-center space-x-2"
//         >
//           <img src={bookIcon} alt="books" />
//           <span>Books</span>
//         </button>

//         {/* Admin Only Links */}
//         {isAuthenticated && user?.role === "Admin" && (
//           <>
//             <button
//               onClick={() => setSelectedComponent("Catalog")}
//               className="w-full py-2 font-medium bg-transparent rounded-md hover:bg-gray-800 flex items-center space-x-2"
//             >
//               <img src={catalogIcon} alt="catalog" />
//               <span>Catalog</span>
//             </button>

//             <button
//               onClick={() => setSelectedComponent("Users")}
//               className="w-full py-2 font-medium bg-transparent rounded-md hover:bg-gray-800 flex items-center space-x-2"
//             >
//               <img src={usersIcon} alt="users" />
//               <span>Users</span>
//             </button>

//             <button
//               onClick={() => setSelectedComponent("AddAdmin")}
//               className="w-full py-2 font-medium bg-transparent rounded-md hover:bg-gray-800 flex items-center space-x-2"
//             >
//               <RiAdminFill className="w-6 h-6" />
//               <span>Add New Admin</span>
//             </button>
//           </>
//         )}

//         {/* User Only Links */}
//         {isAuthenticated && user?.role === "User" && (
//           <button
//             onClick={() => setSelectedComponent("MyBorrowedBooks")}
//             className="w-full py-2 font-medium bg-transparent rounded-md hover:bg-gray-800 flex items-center space-x-2"
//           >
//             <img src={catalogIcon} alt="borrowed books" />
//             <span>My Borrowed Books</span>
//           </button>
//         )}

//         {/* Common Setting Button */}
//         <button
//           onClick={() => setSelectedComponent("UpdateCredentials")}
//           className="w-full py-2 font-medium bg-transparent rounded-md hover:bg-gray-800 flex items-center space-x-2"
//         >
//           <img src={settingIcon} alt="settings" />
//           <span>Update Credentials</span>
//         </button>
//       </nav>

//       {/* Logout Button */}
//       <div className="px-6 py-6">
//         <button
//           onClick={handleLogout}
//           className="py-2 font-medium text-center bg-transparent rounded-md hover:bg-gray-800 flex justify-center items-center space-x-3 mx-auto w-fit"
//         >
//           <img src={logoutIcon} alt="logout" />
//           <span>Logout</span>
//         </button>
//       </div>

//       {/* Close Icon for Mobile */}
//       <img
//         src={closeIcon}
//         alt="close"
//         onClick={() => setIsSideBarOpen(!isSideBarOpen)}
//         className="absolute top-4 right-4 h-6 w-6 cursor-pointer block md:hidden"
//       />
//     </aside>
//   );
// };

// export default SideBar;
