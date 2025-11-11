import React, { useState } from "react";
import placeHolder from "../assets/placeholder.jpg";
import closeIcon from "../assets/close-square.png";
import keyIcon from "../assets/key.png";
import { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddNewAdmin } from "../store/slices/userSlice";

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
    const reader = new FileReader();
  };

const handleAddNewAdmin = (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("avatar", avatar);

  dispatch(AddNewAdmin(formData));
};

  return <>
  <h1>Add New Admin</h1>

</>;
}
export default AddNewAdmin; 
