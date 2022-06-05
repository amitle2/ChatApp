import { Avatar, IconButton } from "@mui/material"
import AttachmentIcon from '@mui/icons-material/Attachment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './Chat.css';
import MicNoneIcon from '@mui/icons-material/MicNone';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";


function Chat() {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState ("");
    const { roomId } = useParams();
    const [ roomName, setRoomName ] = useState("");
    const [ messages, setMessages ] = useState([]);
    const[{ user }, dispatch ] = useStateValue();

    useEffect(() =>{
        if (roomId) {
            db.collection("rooms").doc(roomId).onSnapshot(snapshot => setRoomName(snapshot.data().name));

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data()))
                );
        }
    }, [roomId])


  const sendMessage = (e) => {
      e.preventDefault();
      console.log("You typed >> ", input);

      db.collection('rooms').doc(roomId).collection('messages').add({
          message: input,
          name: user.displayName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setInput("");
  }

  return (
    <div className='chat'>
        <div className='chat__header'>
    <Avatar src={`https://avatars.dicebear.com/api/big-smile/${roomName}.svg`}/>
    <div className='chat__headerInfo'>
        <h3>{roomName}</h3>
        <p>last seen {""}
        {new Date(
            messages[messages.length -1]?.timestamp?.toDate()
        ).toUTCString()}</p>
    </div>
        </div>
        
        <div className='chat__body'>
            {messages.map((message) => (

                <p className={`chat__messgae ${message.name === user.displayName && 'chat__recievr'}`}><span className="chat__name">{message.name}</span>{message.message}<span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span></p>

            ))}

        </div>

        <div className='chat__footer'>
            <form>
                <input value={input} onChange={e =>
                setInput(e.target.value)} placeholder="Type a Message" type="text" />
                <button onClick={sendMessage} type="submit">Send</button>
            </form>
        </div>
        </div>
  )
}

export default Chat