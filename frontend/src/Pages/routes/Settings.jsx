import React, { useState } from "react";
import Sidebar from "../../Components/common/Sidebar";
import PageHeading from "../../Components/common/PageHeading";
import ToggleSwitch from "../../Components/formInputs/ToggleSwitch";

const Settings = () => {
  // States for toggles and inputs
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState(false);
  const [searchVisibility, setSearchVisibility] = useState(false);

  return (
    <div className="lg:h-screen flex flex-col lg:flex-row">
      <Sidebar />
      <div className="p-pagePadding bg-primary bg-opacity-opacityPrimary w-full h-full flex flex-col">
        <PageHeading title={"Settings"} />

        {/* Notifications Section */}
        <div className="mb-6 bg-coolsecondary bg-opacity-30 p-3 rounded-md shadow-sm">
          <h3 className="text-lg text-darkgreen font-medium mb-2">
            Notifications
          </h3>
          <div className="flex justify-between items-center mb-3 text-[16px] text-secondary">
            <span>Email Notifications</span>
            <ToggleSwitch
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
            />
          </div>
          <div className="flex justify-between items-center mb-3 text-[16px] text-secondary">
            <span>SMS Notifications</span>
            <ToggleSwitch
              checked={smsNotifications}
              onChange={() => setSmsNotifications(!smsNotifications)}
            />
          </div>
        </div>

        {/* Theme Settings */}
        <div className="mb-6  bg-coolsecondary bg-opacity-30 p-3 rounded-md shadow-sm">
          <h3 className="text-lg text-darkgreen font-medium mb-2">
            Theme Settings
          </h3>
          <div className="flex justify-between items-center mb-3 text-[16px] text-secondary">
            <span>Dark Mode</span>
            <ToggleSwitch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="mb-6 bg-coolsecondary bg-opacity-30 p-3 rounded-md shadow-sm">
          <h3 className="text-lg text-darkgreen font-medium mb-2">
            Privacy Settings
          </h3>
          <div className="flex justify-between items-center mb-3 text-[16px] text-secondary">
            <span>Profile Visibility</span>
            <ToggleSwitch
              checked={profileVisibility}
              onChange={() => setProfileVisibility(!profileVisibility)}
            />
          </div>
          <div className="flex justify-between items-center mb-3 text-[16px] text-secondary">
            <span>Search Visibility</span>
            <ToggleSwitch
              checked={searchVisibility}
              onChange={() => setSearchVisibility(!searchVisibility)}
            />
          </div>
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex justify-end space-x-3">
          <button className="px-4 py-2 text-darkgreen bg-primary hover:text-secondary transition-colors duration-300 rounded">
            Cancel
          </button>
          <button className="bg-secondary h-full flex justify-center items-center text-primary text-lg font-medium px-4 py-2 cursor-pointer hover:bg-coolsecondary hover:text-primary transition-colors duration-300 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
