import React, { useContext, useRef, useEffect } from 'react';
import './Chat.scss'
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { roomContext } from '../../providers/RoomProvider';


const Chat = function(props) {
  const { 
    chatMessages, setChatMessages,
    socket,
    to,
    msg, setMsg,
    clearChatInput,
    room
   } = useContext(roomContext);
  const users = room.users;
  const send = function() {
    if (msg.length > 1000) {
      return;
    }
    socket.emit('message', {msg, room, to});
    clearChatInput();
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages])
  
  const chatMessageList = chatMessages.map((messageObj, i) => {
    const { username, color, message, pm, system } = messageObj;
    return <ChatMessage key={i} message={message} username={username} color={color} pm={pm} system={system} />;
  });

  return (
    <section className="chat" >
      <ChatInput onChange={setMsg} value={msg} send={send} clear={setChatMessages} users={users} />
      <div id='message-list' > 
        {chatMessageList}
        <div ref={messagesEndRef} /> 
      </div>
    </section>
  );
};

export default Chat;