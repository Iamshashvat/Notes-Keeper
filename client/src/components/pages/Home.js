import React, { useContext, useEffect } from "react";
import Notes from "../notes/Notes";
import NoteForm from "../notes/NoteForm";
import NoteFilter from "../notes/NoteFilter";
import AuthContext from "../../context/auth/authContext";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import NoteDialog from "../notes/NoteDialog";

const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
};
const Home = () => {
  const authContext = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    authContext.loadUser();
  }, []);
  return (
    <div className='grid-2'>
      <div>
        <NoteFilter />
        <Notes />
      </div>
      <Fab
        style={style}
        color='primary'
        aria-label='add'
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <NoteDialog handleClose={handleClose} open={open} />
    </div>
  );
};

export default Home;
