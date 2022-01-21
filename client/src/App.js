import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";

import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import Peer from "simple-peer";
import io from "socket.io-client";

import Light from "./Components/Light";
import Utils from "./Components/Utils";
import Goal from "./Components/Goal";

const socket = io.connect("http://localhost:5000/", {
  transports: ["websocket"],
});

function App() {
  const [me, setme] = useState("");
  const [stream, setstream] = useState();
  const [recevingCall, setrecevingCall] = useState(false);
  const [caller, setcaller] = useState("");
  const [callerSignal, setcallerSignal] = useState();
  const [callAccepted, setcallAccepted] = useState(false);
  const [idToCall, setidToCall] = useState("");
  const [callEnded, setcallEnded] = useState(false);
  const [name, setname] = useState("");

  const [keys, setkeys] = useState({
    a: false,
    w: false,
    s: false,
    d: false,
  });

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setstream(stream);
      });

    socket.on("me", (id) => {
      setme(id);
    });

    socket.on("callUser", (data) => {
      setrecevingCall(true);
      setcaller(data.from);
      setname(data.name);
      setcallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      setcallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setcallAccepted(true);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = (_) => {
    setcallEnded(true);
    connectionRef.current.destroy();
  };

  const keydown = (e) => {
    const key = e.code.replace("Key", "").toLowerCase();
    if (keys[key] !== undefined) {
      setkeys((state) => ({ ...state, [key]: true }));
    }
  };

  const keyup = (e) => {
    const key = e.code.replace("Key", "").toLowerCase();
    if (keys[key] !== undefined) {
      setkeys((state) => ({ ...state, [key]: false }));
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", keydown);
    document.body.addEventListener("keyup", keyup);
    console.log(keys);
  }, []);

  return (
    <div className="App">
      <>
        <Canvas
          style={{ height: window.innerHeight, width: window.innerWidth }}
          pixcelRatio={window.devicePixelRatio}
        >
          <Utils />
          <Light />
          {stream && <Goal keys={keys} stream={stream} />}
        </Canvas>
      </>
    </div>
  );
}

export default App;
