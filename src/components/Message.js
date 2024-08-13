import React , { useEffect, useRef } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { format } from 'date-fns';

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  
  // Format the timestamp
  const timestamp = message.createdAt ? format(message.createdAt.toDate(), 'dd-MM-yyyy HH:mm:ss') : 'Timestamp not available';

  const avatarUrl = message.avatar || '/robot.png';

  const messageRef = useRef(null);

  // Scroll to the latest message
  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);


  return (
    <div
      className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}
      ref={messageRef} // Attach ref to the message element
    >
      <img
        className="chat-bubble__left"
        //src={message.avatar}
        src={avatarUrl}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
        <p className="message-timestamp">{timestamp}</p> {/* Add timestamp here */}
      </div>
    </div>
  );
};

export default Message;
