import { useState, useLayoutEffect } from "react";
import "./App.css";
import Viewer from "./components/Viewer";
import Editor from "./components/Editor";
import { Toaster } from "react-hot-toast";
import { AiOutlineBook } from "react-icons/ai";

function App() {
  const [testwall, settestwall] = useState([]);
  const [width, height] = useWindowSize();
  const [showSideBar, setshowSideBar] = useState(true);
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

      <div className={`editor ${showSideBar ? "w-80" : ""}`}>
        <div className="flex flex-col">
          <a
            href="/"
            className="mb-2 mt-2 flex  text-center justify-center items-center text-xl font-bold text-green-900"
          >
            <span className="mr-2">
              <AiOutlineBook size={38} />
            </span>
            <span>{showSideBar && "Digital Evidence Board"}</span>
          </a>
        </div>

        <div className="flex flex-col justify-between px-4 ">
          <Editor
            settestwall={settestwall}
            testwall={testwall}
            showSideBar={showSideBar}
            setshowSideBar={setshowSideBar}
          />
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
