import React, { useState } from "react";
import placeHolder from "../assets/placeholder.jpg";
import closeIcon from "../assets/close-square.png";
import keyIcon from "../assets/key.png";
import { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewAdmin } from "../store/slices/userSlice";
import { toggleAddNewAdminPopup } from "../store/slices/popUpSlice";

const AddNewAdmin = () => {

  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatar(file);
    }
  };

const handleAddNewAdmin = (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("avatar", avatar);

  dispatch(addNewAdmin(formData));
};

  return <>
  <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex item-center justify-center z-50">
    <div className="w-full bg-white rounded-lg shadow-lg md:w-1/3">
      <div className="p-6"> 
        <header className="flex items-center justify-between mb-7 border-b-[1px] pb-3">
          <div className="flex items-center gap-3">
            <img src={keyIcon} alt="key icon" className="bg-gray-300 rounded-lg" />
            <h3 className="text-xl font-bold">Add New Admin</h3>
          </div>
          <img src={closeIcon} alt="close icon" className="cursor-pointer" onClick={()=>dispatch(toggleAddNewAdminPopup())} />
        </header>


       <form onSubmit={handleAddNewAdmin}>
{/* Avatar Preview */}

<div className="flex flex-col items-center mb-4">
  <label htmlFor="avatarInput" className="cursor-pointer">
    <img src={avatarPreview ? avatarPreview : placeHolder} alt="avatar" className="w-24 h-24 object-cover rounded-full" />
    <input type="file"  id="avatarInput" accept="image/*" className="hidden" onChange={handleImageChange} />
  </label>
</div>


{/* Name Input */}
<div className="mb-4">
  <label className="block text-gray-700 mb-2 font-medium" htmlFor="name">Name</label>
  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
</div>
{/* Email Input */}
<div className="mb-4">
  <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">Email</label>
  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
</div>
{/* Password Input */}
<div className="mb-6">
  <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">Password</label>
  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
</div>

{/* Submit Button */}
<div className="flex justify-end">
<button type="button " onClick={()=>dispatch(toggleAddNewAdminPopup())} className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600">Cancel</button>
<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Add</button>
</div>


       </form>

      </div>
    </div>
  </div>

</>;
}
export default AddNewAdmin; 
