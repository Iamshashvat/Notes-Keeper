import React, { useState, useContext, useEffect } from "react";
import NoteContext from "../../context/note/noteContext";

const NoteForm = (props) => {
  const noteContext = useContext(NoteContext);

  const { addNote, updateNote, clearCurrent, current } = noteContext;

  useEffect(() => {
    if (current !== null) {
      setNote(current);
    } else {
      setNote({
        title: "",
        noteText: "",
        type: "personal",
      });
    }
  }, [noteContext, current]);

  const [note, setNote] = useState({
    title: "",
    noteText: "",
    type: "personal",
  });

  const { title, noteText, date, type } = note;
  const { handleClose } = props;

  const onChange = (e) => setNote({ ...note, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(note);
    if (current === null) {
      addNote(note);
    } else {
      updateNote(note);
    }
    handleClose();
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? "Edit Note" : "Add Note"}</h2>
      <input
        type='text'
        placeholder='Title'
        name='title'
        value={title}
        onChange={onChange}
      />
      <textarea
        type='text'
        placeholder='Note Text'
        name='noteText'
        value={noteText}
        onChange={onChange}
      />
      <h5 style={{ paddingTop: "10px" }}>Note Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type='radio'
        name='type'
        value='official'
        checked={type === "official"}
        onChange={onChange}
      />{" "}
      Official
      <div>
        <input
          type='submit'
          value={current ? "Update Note" : "Add Note"}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default NoteForm;
