import React, { useEffect, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import HoverMenu from "../menus/HoverMenu";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";

const Card = ({
  task,
  cardClass,
  addCompletionDate,
  taskId,
  removeCompletionDate,
  isTickMarked,
  isChecked,
  showMenu,
  deleteTask,
  updateTask
}) => {
  const [isCompleted, setIsCompleted] = useState(false);

  // check / uncheck list
  const handleToggle = () => {
    const newToggleValue = !isCompleted;
    setIsCompleted(newToggleValue);
    if (newToggleValue) {
      addCompletionDate(taskId); // add date
    } else {
      removeCompletionDate(taskId); // remove date
    }
    isTickMarked(taskId, newToggleValue); // update status directly with the new value
  };

  // Hover Menu items
  const menuItems = [
    {
      key: "1",
      label: "Update",
      icon: <UploadOutlined />,
      onClick: () => {
        // console.log("Upload clicked");
        updateTask(taskId, task);
      },
    },
    {
      key: "2",
      label: "Delete",
      icon: <DeleteOutlined />,
      onClick: () => {
        deleteTask(taskId);
      },
      danger: true,
    },
  ];

  useEffect(() => {
    setIsCompleted(isChecked); //get from server
  }, []);

  return (
    <div
      className={`border-b border-coolsecondary border-opacity-30 p-1.5 mb-2 bg-opacity-30 flex justify-start items-center space-x-5 ${cardClass} `}
    >
      <div
        className="bg-primary shadow-sm rounded-full cursor-pointer h-7 w-7 flex justify-center items-center"
        onClick={handleToggle}
      >
        {isCompleted && <GiCheckMark className="text-secondary text-sm" />}
      </div>
      <div
        className={`text-[13px] text-secondary ${isCompleted && "line-through"}`}
      >
        {task}
      </div>

      {/* Hover menu */}
      <div className="flex flex-1 justify-end items-center cursor-pointer">
       { showMenu && <HoverMenu items={menuItems} />}
      </div>
    </div>
  );
};

export default Card;
