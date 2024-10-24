import React, { useEffect, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import HoverMenu from "../menus/HoverMenu";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
  updateTask,
}) => {
  const [isCompleted, setIsCompleted] = useState(false);

  // Draggable div
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: taskId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
      onClick: (e) => {
        // e.stopPropagation();
        // console.log("Upload clicked");
        updateTask(taskId, task);
      },
    },
    {
      key: "2",
      label: "Delete",
      icon: <DeleteOutlined />,
      onClick: (e) => {
        // e.stopPropagation();
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
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`border-b border-coolsecondary border-opacity-30 p-1.5 mb-2 bg-opacity-30 flex justify-start items-center space-x-5 ${cardClass} ${
        isDragging
          ? "opacity-50 shadow-lg cursor-grabbing z-50"
          : "cursor-pointer"
      } `}
    >
      <div
        className="bg-primary shadow-sm rounded-full cursor-pointer h-7 w-7 flex justify-center items-center"
        onClick={handleToggle}
      >
        {isCompleted && <GiCheckMark className="text-secondary text-sm" />}
      </div>
      <div
        className={`text-[13px] text-secondary ${
          isCompleted && "line-through"
        }`}
      >
        {task}
      </div>

      {/* Hover menu */}
      <div className="flex flex-1 justify-end items-center cursor-pointer">
        {showMenu && (
          <div
            onClick={(e) => {
              e.stopPropagation(); // Prevents drag interaction while interacting with the menu
            }}
          >
            <HoverMenu items={menuItems} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
