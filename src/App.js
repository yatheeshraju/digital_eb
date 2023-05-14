import { useState } from "react";
import "./App.css";
import Viewer from "./components/Viewer";
import Editor from "./components/Editor";
import { Toaster } from "react-hot-toast";

function App() {
  const [testwall, settestwall] = useState([]);
  return (
    <div className="app">
      <div className="editor">
        <Toaster />
        <div className="w-full flex flex-col p-4 min-h-screen">
          <a
            href="/"
            className="mb-2 w-full text-center text-xl font-bold text-black"
          >
            Digital Evidence Board
          </a>
          <Editor settestwall={settestwall} testwall={testwall} />
        </div>
      </div>
      <div className="viewer">
        <Viewer
          size={{
            width: (window.innerWidth / 4) * 3,
            height: window.innerHeight,
          }}
          data={testwall}
        />
      </div>
    </div>
  );
}

export default App;
