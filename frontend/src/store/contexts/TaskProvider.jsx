import React, {  useRef, useState } from "react";
import { backendUrl } from "../../utils/config";
import { TaskContext } from "../store";
import {
  makeAuthenticatedPOSTRequest,
  makeAuthenticatedPUTRequest,
  makeAuthenticatedDELETERequest,
  getToken,
} from "../../utils/serverHelpers";
import {
  fetchListHelper,
  addCompletionDateHelper,
  removeCompletionDateHelper,
  isCheckedHelper,
} from "../../utils/crudHelpers";
import { ToastProvider, Toast } from "../../Components/common/Toast";

const TaskProvider = ({children}) => {
  const [listOfTasks, setListOfTasks] = useState([]);
  const [task, setTask] = useState("");
  const [key, setKey] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateTaskId, setUpdateTaskId] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e) => setTask(e.target.value);

  // shift focus when updating task
  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Create Tasks
  const addTask = async () => {
    if (!task) {
      console.error("Task cannot be empty");
      Toast.error("Empty task cannot be added!");
      return;
    }

    try {
      const response = await makeAuthenticatedPOSTRequest("/task/addTask", {
        task: task,
      });
      setKey("");
      setTask("");

      // console.log("Task added successfully", response);
      // Toast.success("Task added successfully.");
      await getTasklist();
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  // add tasks on key down - Enter
  const handleKeyDown = (e) => {
    setKey(e.key);
    if (e.key === "Enter") {
      if (isUpdating) {
        handleUpdateClick(updateTaskId, task);
      } else {
        addTask();
      }
    }
  };

  // GET all tasks
  const getTasklist = async () => {
    await fetchListHelper("/task/getAllTasks", setListOfTasks);
  };

  // Update task - call fn when update btn clicked
  const updateTask = async (taskId, task) => {
    handleFocus();
    setIsUpdating(true);
    setTask(task); // task to update
    setUpdateTaskId(taskId);
  };

  // call fn - when update btn clicked
  const handleUpdateClick = async (taskId, task) => {
    try {
      const response = await makeAuthenticatedPUTRequest(
        `/task/updateTask/${taskId}`,
        { task: task }
      );
      // console.log(response);
      setIsUpdating(false);
      setTask("");
      setKey("");
      setUpdateTaskId(null);
      Toast.success("Task updated successfully.");
      await getTasklist();
    } catch (error) {
      console.error("Error updating task:", error);
      Toast.error("Failed to update task.");
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      const response = await makeAuthenticatedDELETERequest(
        `/task/deleteTask/${id}`
      );
      // Toast.success("Task deleted successfully.");
      // console.log(response);
      await getTasklist();
    } catch (error) {
      console.error("Error deleting task:", error);
      // error && Toast.error(error.message);
    }
  };

  // Delete all tasks
  const delAllTasks = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to permanently delete all tasks?"
    );
    const token = getToken();

    if (!isConfirmed) {
      return;
    }

    const url = `${backendUrl}/task/deleteAllTasks`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        if (json.message === "No tasks to delete") {
          Toast.info(json.message);
        } else {
          Toast.success(json.message);
        }

        await getTasklist();
      } else {
        throw new Error(json.error || `Error: ${response.status}`);
      }
    } catch (error) {
      Toast.error(`Failed to delete tasks: ${error.message}`);
    }
  };

  // task Completed
  const taskCompletionDate = async (id) => {
    await addCompletionDateHelper("/task/completionTask", id);
  };

  // task Uncompleted
  const taskUncompleted = async (id) => {
    await removeCompletionDateHelper("/task/removeCompletionDate", id);
  };

  // is task checked
  const isTaskChecked = async (id, isChecked) => {
    await isCheckedHelper("/task/statusUpdate", id, isChecked);
  };

  return (
    <TaskContext.Provider
      value={
        {
          addTask,
        getTasklist,
        handleKeyDown,
        updateTask,
        handleUpdateClick,
        deleteTask,
        delAllTasks,
        taskCompletionDate,
        taskUncompleted,
        isTaskChecked,
        handleChange,
        inputRef,
        task,
        isUpdating,
        updateTaskId,
        listOfTasks,
        setListOfTasks
        }
      }
    >
      <ToastProvider />
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
