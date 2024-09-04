import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const socket = io("http://localhost:3000/");
  useEffect(() => {
    socket.on("input-message", (m) => {
      console.log(m);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  socket.on("input-message", (e) => {
    console.log(e);
  });
  function submitHandler(e) {
    e.preventDefault();
    socket.emit("message", message);
  }
  return (
    <div>
      <h1>Welcome to form</h1>
      <form onSubmit={submitHandler}>
        <label>enter message</label>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button type="submit">btn</button>
      </form>
    </div>
  );
}

export default App;
