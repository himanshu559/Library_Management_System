import React from 'react'
import closeIcon from "../assets/close-square.png";
import { use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updatePassword } from '../store/slices/authSlice';
import settingIcon from "../assets/setting.png";
import { toggleSettingPopup } from '../store/slices/popUpSlice';

const SettingPopup = () => {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("currentPassword", currentPassword);
    data.append("newPassword", newPassword);
    data.append("confirmPassword", confirmPassword);
    dispatch(updatePassword({ currentPassword, newPassword, confirmPassword }));
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex item-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg sm:auto lg:w-1/2 2xl:w-1/3">
        <div className="p-6">
          <header className="flex items-center justify-between mb-7 border-b-[1px] pb-3">
            <div className="flex items-center gap-3">
              <img src={settingIcon} alt="Setting icon" className="bg-gray-300 rounded-lg" />
              <h3 className="text-xl font-bold">Change Credential</h3>
            </div>
            <img src={closeIcon} alt="close icon" className="cursor-pointer" onClick={() => dispatch(toggleSettingPopup())} />
          </header>


          <form onSubmit={handleUpdatePassword}>
            {/* Name Input */}
            <div className="mb-4 sm:flex gap-4 items-center w-full">
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="name">Enter the Current Password</label>
              <input type="password" id="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder='Current Password' required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            {/* Email Input */}
            <div className="mb-4 sm:flex gap-4 items-center w-full" >
              <label className="block text-gray-700 mb-2 font-medium w-full" htmlFor="password">Enter new Password</label>
              <input type="password" id="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='New Password' required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            {/* Password Input */}
            <div className="mb-4 sm:flex gap-4 items-center w-full">
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">Enter Confirm Password</label>
              <input type="password" id="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Submit Button */}
            {/* <div className="flex justify-end">
              <button type="button " onClick={() => dispatch(toggleAddNewAdminPopup())} className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600">Cancel</button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Add</button>
            </div> */}


              <div>
                <button type="button " onClick={() => dispatch(toggleSettingPopup())} className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600">Cancel</button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Conform</button>
              </div>


          </form>

        </div>
      </div>
    </div>
  )
}

export default SettingPopup
