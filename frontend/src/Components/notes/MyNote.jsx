import React, { useEffect, useState } from "react";
import TextareaInput from "../formInputs/TextareaInput";
import LoadingSpinner from "../common/LoadingSpinner";
import {
  makeAuthenticatedPOSTRequest,
  makeAuthenticatedGETRequest,
} from "../../utils/serverHelpers";

const MyNote = () => {
  const [myNote, setMyNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const note = e.target.value;
    setMyNote(note);

    setLoading(true);
    try {
      await makeAuthenticatedPOSTRequest("/myNotes/note", { note });
      //  console.log(save)
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      try {
        const response = await makeAuthenticatedGETRequest("/myNotes/getNote");
        if (response && response.note) {
          setMyNote(response.note[0].note);
          // console.log(response)
        } else {
          console.warn("No note found.");
        }
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, []);

  return (
    <div className="relative h-full">
      {loading && <LoadingSpinner />}
      <TextareaInput handleChange={handleChange} value={myNote} />
    </div>
  );
};

export default MyNote;
