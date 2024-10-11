import React, { useCallback, useEffect, useRef, useState } from "react";
import Card from "./Card";
import {
  makeAuthenticatedDELETERequest,
  makeAuthenticatedPOSTRequest,
  makeAuthenticatedPUTRequest,
} from "../../utils/serverHelpers";
import {
  addCompletionDateHelper,
  fetchListHelper,
  isCheckedHelper,
  removeCompletionDateHelper,
} from "../../utils/crudHelpers";
import InputHabit from "../formInputs/InputHabit";
import { IoMdAdd } from "react-icons/io";
import { Toast, ToastProvider } from "../common/Toast";
import PageHeading from "../common/PageHeading";
import { TiRefreshOutline } from "react-icons/ti";
import { throttle } from "../../utils/throttleandDebounce";

const DailyTasks = () => {
  const [listOfHabits, setListOfHabits] = useState([]);
  const [listOfTasks, setListOfTasks] = useState([]);
  const [task, setTask] = useState("");
  const [key, setKey] = useState("");
  const [showMenu, setShowMenu] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateTaskId, setUpdateTaskId] = useState("");
  const inputRef = useRef(null);
  const [refreshHabits, setRefreshHabits] = useState(false)

  const handleChange = (e) => setTask(e.target.value);

  // shift focus when updating task
  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // ********************************** HABIT APIS **************************
  // Get User Habits Array
  const getMyHabits = async () => {
    await fetchListHelper("/habit/getHabitslist", setListOfHabits);
  };

  // Add Completion Dates
  const habitCompleted = async (id) => {
    await addCompletionDateHelper("/habit/completionHabit", id);
  };

  // remove Completion Dates
  const habitUncompleted = async (id) => {
    await removeCompletionDateHelper("/habit/removeCompletionDate", id);
  };

  // is habit checked
  const isHabitChecked = async (id, isChecked) => {
    await isCheckedHelper("/habit/statusUpdate", id, isChecked);
  };

  // uncheck on refresh
  const uncheckAllHabits = async () => {
    try {
      await makeAuthenticatedPOSTRequest("/habit/uncheckAll");
    // const res =  await fetchListHelper("/habit/getHabitslist", setListOfHabits);
      // console.log(res);
      // console.log(listOfHabits);
      // console.log(setListOfHabits)
      // setListOfHabits((prevHabits) =>
      //   prevHabits.map((habit) => ({
      //     ...habit,
      //     isCompleted: false,
      //   }))
      // );
    } catch (error) {
      console.error("Error unchecking all habits:", error);
    }
  };
  

  // ************************************ TASKS APIS ***************************
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
      Toast.success("Task added successfully.");
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

  // Delete Task
  const deleteTask = async (id) => {
    try {
      const response = await makeAuthenticatedDELETERequest(
        `/task/deleteTask/${id}`
      );
      Toast.success("Task deleted successfully.");
      // console.log(response);
      await getTasklist();
    } catch (error) {
      console.error("Error deleting task:", error);
      // error && Toast.error("Failed to delete task");
    }
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

  // Throttled Get Tasks and Habits
  const throttledGetMyTasks = useCallback(throttle(getTasklist, 100000, []))
  const throttledGetMyHabits = useCallback(throttle(getMyHabits, 100000, []))

  useEffect(()=>{
    throttledGetMyHabits();
    throttledGetMyTasks();
  },[])

  return (
    <div className="">
      <ToastProvider />
      {/* head */}
      <PageHeading title={" Today's Tasks"} />

      {/* Input tasks */}
      <div className="flex justify-center items-center mb-4 rounded-md space-x-3 bg-gray-100 shadow-md">
        <InputHabit
          ref={inputRef}
          type={"text"}
          name={"task"}
          value={task}
          onChange={handleChange}
          placeholder={"Eg. Meeting with a client at 5 PM."}
          className={"bg-gray-100 pl-5"}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={() => {
            isUpdating ? handleUpdateClick(updateTaskId, task) : addTask();
          }}
          className="bg-primary h-full flex justify-center items-center text-secondary text-lg font-medium px-4 py-2 cursor-pointer hover:bg-coolsecondary hover:text-primary transition-colors duration-300 rounded-md"
        >
          <IoMdAdd className="text-2xl mr-2" />
          {isUpdating ? "Update" : "Add"}
        </button>
      </div>

      {/* View list */}
      <div className="">
        {/* View habits */}
        <div className="flex justify-between items-center ">
          <p className="text-[10px] text-right font-medium text-secondary w-fit bg-green-100 rounded-sm p-1 mb-2 ">
            My Habits
          </p>
          <TiRefreshOutline
            className="text-3xl text-coolsecondary hover:text-secondary cursor-pointer mb-2"
            onClick={uncheckAllHabits}
          />
        </div>
        {listOfHabits.map((habit, index) => (
          <Card
            key={index}
            task={habit.habit}
            cardClass={"bg-green-100"}
            addCompletionDate={habitCompleted}
            removeCompletionDate={habitUncompleted}
            isTickMarked={isHabitChecked}
            taskId={habit._id}
            isChecked={habit.isCompleted}
          />
        ))}

        {/* view tasks */}
        <div className="flex justify-between items-center ">
          <p className="text-[10px] text-right font-medium text-secondary w-fit bg-cyan-100 rounded-sm p-1 my-2 ">
            Today's Tasks
          </p>
          {/* <TiRefreshOutline className="text-3xl text-coolsecondary hover:text-secondary cursor-pointer mb-2" /> */}
        </div>
        {listOfTasks.map((task, index) => (
          <Card
            key={index}
            taskId={task._id}
            task={task.task}
            cardClass={"bg-cyan-100"}
            showMenu={showMenu}
            deleteTask={deleteTask}
            updateTask={updateTask}
            addCompletionDate={taskCompletionDate}
            removeCompletionDate={taskUncompleted}
            isChecked={task.isCompleted}
            isTickMarked={isTaskChecked}
          />
        ))}
      </div>
    </div>
  );
};

export default DailyTasks;
