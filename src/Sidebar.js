import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { Avatar, IconButton } from "@mui/material"
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import ChatIcon from '@mui/icons-material/Chat';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';
import db from "./firebase";
import { useStateValue } from "./StateProvider";


function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();


  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
    setRooms(
      snapshot.docs.map((doc) =>({
        id: doc.id,
        data: doc.data(),
      }))
      )
    );
    return () => {
  }
  }, []);

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
      <Avatar src={user?.photoURL}/> 
      </div>
      <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
        <SearchIcon/>
        <input placeholder='Search' type="text" />
        </div>
      </div>
      <div className='sidebar__chats'>
       <SidebarChat addNewChat/>
       {rooms.map((room) => (
         <SidebarChat key={room.id} id={room.id}
         name={room.data.name} />
        ))}   

      </div>
    </div>
  );
}

export default Sidebar
