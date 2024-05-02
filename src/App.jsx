import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [speCharAllow, setSpeCharAllow] = useState(false);
  const [passwd, setPasswd] = useState("");
  const [copy, setCopy] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    
    let pass = "";
    let str = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ";

    if (numAllow) str += "12345678901234567890";
    if (speCharAllow) str += "!@#$%&*/";
    for (let i = 0; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length) + 1);
    }
    setPasswd(pass);
  }, [length, numAllow, speCharAllow,copy, setPasswd]);

  const passwordCopy = useCallback(() => {
    setCopy((prev) => !prev);
    window.navigator.clipboard.writeText(passwd);
  }, [passwd]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllow, speCharAllow, passwordGenerator]);

  return (
    <div className="h-screen w-screen bg-mantis-200 flex justify-center relative">
      <div className="h-5/6 w-5/6  m-auto flex flex-col items-center justify-between">
        <div className=" mt-4 text-4xl font-bold text-mantis-800 text-center">
          Password Generator
        </div>
        <div className="h-5/6 w-11/12 m-4 flex flex-col items-center justify-between ">
          <div className="h-1/3 w-full  flex flex-col items-center pt-16  gap-7">
            <input
              type="text"
              value={passwd}
              readOnly
              placeholder="Password"
              className="h-full w-full px-4 py-1 accent-mantis-700 text-mantis-700 font-semibold font- rounded-3xl text-sm sm:text-xl sm:w-11/12 md:w-9/12 lg:w-6/12 xl:w-5/12 text-center"
            />
            <button
              onClick={passwordCopy}
              className=" font-bold m-4 p-2 bg-mantis-500 rounded-2xl hover:bg-mantis-600 active:bg-mantis-400"
            >
              COPY
            </button>
          </div>
          <div className=" h-2/3 w-full mt-8 ">
            <div className=" h-1/3 w-full flex flex-col items-center justify-evenly">
              <input
                type="range"
                max={30}
                min={5}
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-2/3 accent-mantis-700 sm:w-5/12 md:w-5/12 lg:w-4/12 xl:w-2/12"
              />
              <label className=" text-xl text-blue-700 font-semibold">
                Length:{length}
              </label>
            </div>
            <div className="2/3 w-full flex flex-col items-center justify-evenly gap-5">
              <div className="w-full flex justify-center items-center gap-5 ">
                <input
                  type="checkbox"
                  defaultChecked={numAllow}
                  id="numberInput"
                  onChange={() => {
                    setNumAllow((pre) => !pre);
                  }}
                  className="h-4 w-4 accent-mantis-700"
                />
                <label className="ml-2 text-2xl text-mantis-800 font-bold">
                  Number
                </label>
              </div>
              <div className="w-full flex justify-center items-center gap-5 ">
                <input
                  type="checkbox"
                  defaultChecked={speCharAllow}
                  onChange={() => {
                    setSpeCharAllow((pre) => !pre);
                  }}
                  className="h-4 w-4 accent-mantis-700"
                />
                <label className="ml-2 text-2xl text-mantis-800 font-bold">
                  Special Character
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
