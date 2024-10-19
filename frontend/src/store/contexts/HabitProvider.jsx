import React, { useState } from "react";
import {
  addCompletionDateHelper,
  fetchListHelper,
  isCheckedHelper,
  removeCompletionDateHelper,
} from "../../utils/crudHelpers";
import { makeAuthenticatedPOSTRequest } from "../../utils/serverHelpers";
import { HabitContext } from "../store";
import { ToastProvider } from "../../Components/common/Toast";

const HabitProvider = ({children}) => {
  const [listOfHabits, setListOfHabits] = useState([]);
  const [showMenu, setShowMenu] = useState(true);

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
  return (
    <HabitContext.Provider
      value={{
        listOfHabits,
        showMenu,
        getMyHabits,
        habitCompleted,
        habitUncompleted,
        isHabitChecked,
        uncheckAllHabits,
      }}
    >
        {children}
    </HabitContext.Provider>
  );
};

export default HabitProvider;
