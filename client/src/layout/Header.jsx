import React, { useEffect, useState } from "react";
import settingIcon from "../assets/setting.png";
import userIcon from "../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { use } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateTimeDate = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      setCurrentTime(`${hours}:${minutes} ${ampm}`);

      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      setCurrentDate(now.toLocaleDateString("en-US", options));
    };

    updateTimeDate();
    const intervalId = setInterval(updateTimeDate, 1000); // Update every minute
    return () => clearInterval(intervalId);

  }, []);
  return <>

    <header className="absolute top-0 left-0 w-full flex justify-between items-center bg-white h-16 px-6 shadow-md">
      {/* // left side */}
      <div className="flex item-center gap-2">
        <img src={userIcon} alt="usericon" className="w-8 h-8" />
        <div className="flex flex-col">
          <span className="text-sm font-medium sm:text-lg lg:text-xl sm:font-semibold" >{user && user.name}</span>
          <span className="text-sm font-medium sm:text-lg sm:font-medium">{user && user.role}</span>
        </div>
      </div>
      {/* // right side */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col text-sm lg:text-base text-right items-end font-semibold">
          <span>{currentTime}</span>
          <span>{currentDate}</span>
        </div>
        <span className="bg-black h-14 w-[2px]"/>
        <img src={settingIcon} alt="settingicon" className="w-8 h-8 " onClick={()=>{toggleSettingPopup()}} />
      </div>
    </header>


  </>
}
export default Header;
