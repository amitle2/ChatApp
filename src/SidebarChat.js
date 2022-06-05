import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SidebarChat.css';
import { Avatar } from '@mui/material';
import './Sidebar';
import db from './firebase';

function SidebarChat( {id, name, addNewChat} ) {
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection('rooms')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => 
      setMessages(snapshot.docs.map((doc) => doc.data())));
    }
  }, [id])

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
    <div className='sidebarChat'>
        <Avatar src={`https://avatars.dicebear.com/api/big-smile/${name}.svg`}/>
        <div className='sidebarChat__info'>
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
    </div>
    </Link>
  ) : (
    <div onClick={createChat} className='sidebarChat'>
          <h2>Add new Chat</h2>
        </div>
  );
}

export default SidebarChat