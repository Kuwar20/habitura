const { makeAuthenticatedPOSTRequest, makeAuthenticatedGETRequest } = require("./serverHelpers");

// Get the whole list Array
export const fetchListHelper = async (endpoint, setState) => {
    try {
      const response = await makeAuthenticatedGETRequest(endpoint);
      if (response && Array.isArray(response)) {
        setState(response);
      } else {
        console.error("Unexpected response format", response);
      }
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
    }
  };

// Add date to Completion dates array
export const addCompletionDateHelper = async (endpoint, id) => {
    const sendDate = { date: new Date().toISOString().split("T")[0] };
    try {
      const response = await makeAuthenticatedPOSTRequest(`${endpoint}/${id}`, sendDate);
    //   console.log(response);
    } catch (error) {
      console.error("Failed to send completion date", error);
    }
  };

// Remove date to Completion dates array
export const removeCompletionDateHelper = async (endpoint,id) => {
    const sendDate = { date: new Date().toISOString().split("T")[0] };
    try {
      const response = await makeAuthenticatedPOSTRequest(
        `${endpoint}/${id}`,
        sendDate
      );
      // console.log(response);
    } catch (error) {
      console.error("Failed to remove completion date", error);
    }
  };

//  Is checked or not
export const isCheckedHelper = async (endpoint,id, isChecked) => {
    try {
      const response = await makeAuthenticatedPOSTRequest(
        `${endpoint}/${id}`,
        { isCompleted: Boolean(isChecked) }
      );
      // console.log(response);
    } catch (error) {
      console.error("Failed to Update status of a habit", error);
    }
  };