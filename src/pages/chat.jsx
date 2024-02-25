"use client";

import { useState, useEffect } from 'react'
import OnlineUser from '@/components/OnlineUser';
import Message from '@/components/Message';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid';
import background from '@/images/background2.jpg'

export default function Home() {

  const router = useRouter();
  const username = router.query["username"];
  const gender = router.query["gender"];
  const socket = io("http://localhost:3001");
  const [message, setMessage] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [uid, setUID] = useState(uuidv4());


  useEffect(() => {

    if (!router.isReady) return;

    socket.on("connect", () => {
      console.log("Connected successfully");
      socket.emit("get_user_details", username, gender, uid);

    });

    return () => socket.disconnect();

  }, [router.isReady]);


  socket.on("update_users", (users) => {
    setUsersList(users);

  });

  socket.on("update_messages", (messages) => {
    setMessagesList(messages);
    setMessage('');

  });


  socket.on("disconnect", () => { });

  const onSendClicked = () => {
    socket.emit("send_message", message, username, gender, uid);

  }



  return (

    // className="bg-no-repeat bg-cover bg-center backdrop-blur-lg" style={{ backgroundImage: "url(" + background.src + ")" }}
    <main className="p-10 flex flex-col font-Montserrat box-border min-h-screen text-white w-full h-full bg-gray-900">

      <div className="w-full h-full">

        <p className="bg-gradient-to-r from-blue-500 from-10% via-blue-600 via-50% rounded-lg to-blue-500 font-bold text-2xl text-center mb-16">Welcome {username}!</p>

        <div className="flex flex-row font-bold text-center mb-16 gap-8">

          <div className="flex flex-col items-center w-64 h-fit">
            <div className=" w-full rounded-md">
              <p className=" bg-gradient-to-br from-purple-500 to-purple-700 text-center font-bold rounded-xl mb-4 ">Online Users: {usersList.length}</p>

              {usersList.map((user, index) => {

                var isMe = false;
                if (user.uid == uid) {
                  user.username = "You";
                  isMe = true;
                }
                return (
                  <OnlineUser key={index} username={user.username} gender={user.gender} isMe={isMe} ></OnlineUser>
                )
              })}


            </div>
          </div>

          <div className="bg-gray-900 flex-1 h-[calc(100vh-9.5rem)] justify-end">
            <div className="flex flex-col border-4 border-b-0 h-[calc(100vh-13.5rem)] p-4 overflow-auto bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url(" + background.src + ")" }}>
              {messagesList.map((message, index) => {
                console.log(message.body);
                var isMe = false;
                if (message.uid == uid) {
                  message.username = "You";
                  isMe = true;
                }
                return (
                  <div className={`flex flex-col ${isMe ? 'items-end' : {}}`}>
                    <Message key={index} message={message.body} username={message.username} gender={message.gender} isMe={isMe}></Message>
                  </div>
                )
              })}
            </div>

            <div className="border-4 flex-1 h-16 flex flex-row items-center">
              <input type="text" className="h-full w-full bg-transparent p-4 focus:outline-0"
                value={message}
                onChange={(e) => {
                  setMessage(e.currentTarget.value)
                  console.log(e.currentTarget.value)
                }} />
              <button onClick={onSendClicked}
                className="bg-purple-700 w-20 h-1/2 rounded-5xl m-3 hover:bg-purple-500" >SEND</button>
            </div>

          </div>

        </div>

      </div>
    </main >
  );
}
