import React, { useContext } from "react";
import PropTypes from "prop-types";
import NoteContext from "../../context/note/noteContext";
import NoteDialog from "./NoteDialog";

const NoteItem = ({ note }) => {
  const noteContext = useContext(NoteContext);
  const { deleteNote, setCurrent, clearCurrent } = noteContext;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { _id, title, noteText, date, type } = note;

  const onDelete = () => {
    deleteNote(_id);
    clearCurrent();
  };
  const handleEdit = () => {
    setCurrent(note);
    handleClickOpen();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {title}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " + (type === "official" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {date && (
          <li>
            <i className='fas fa-calendar-day' /> {date}
          </li>
        )}
        {noteText && (
          <li>
            <i className='fas fa-sticky-note' /> {noteText}
          </li>
        )}
      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={handleEdit}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
      <NoteDialog open={open} handleClose={handleClose} />
    </div>
  );
};

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
};

export default NoteItem;
