import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUserName] = useState("");
  const [roomID, setRoomID] = useState("");
  const [connection, setConnection] = useState(false);
  const joinRoom = () => {
    if (username === "" || roomID === "") return;
    socket.emit("join_room", roomID);
    setConnection(true);
  };
  return (
    <div className="App">
      {connection === false ? (
        <>
          <h2 className="text-center text-white">Join a room</h2>
          <div className=" container d-flex flex-column">
            <input
              type="text"
              className="form-control my-2"
              placeholder="Name"
              onChange={(event) => setUserName(event.target.value)}
            />
            <input
              type="text"
              className="form-control my-2"
              placeholder="Room ID"
              onChange={(event) => setRoomID(event.target.value)}
            />
            <button onClick={joinRoom} className="btn btn-primary my-2">
              Join
            </button>
          </div>
        </>
      ) : (
        <Chat
          socket={socket}
          username={username}
          roomID={roomID}
          connection={setConnection}
        />
      )}
    </div>
  );
}

export default App;
