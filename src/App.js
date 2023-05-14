import { useState, useLayoutEffect } from "react";
import "./App.css";
import Viewer from "./components/Viewer";
import Editor from "./components/Editor";
import { Toaster } from "react-hot-toast";

function App() {
  const [testwall, settestwall] = useState([]);
  const [width, height] = useWindowSize();

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  return (
    <div className="app">
      <Toaster />

      <div className="editor w-80">
        <div className="flex flex-col">
          <a
            href="/"
            className="mb-2 text-center text-xl font-bold text-green-900"
          >
            Digital Evidence Board
          </a>
        </div>
        <div className="flex flex-col p-4 min-h-screen">
          <Editor settestwall={settestwall} testwall={testwall} />
        </div>
      </div>

      <div className="viewer">
        <Viewer
          size={{
            width: width,
            height: height,
          }}
          data={testwall}
        />
      </div>
    </div>
  );
}

export default App;
