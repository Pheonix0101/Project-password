import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [withNumber, setWithNumber] = useState(false);
  const [withChar, setWithChar] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const passGenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (withNumber) str += "1234567890";
    if (withChar) str += "!@#$%^&*()-_=+[{]};:'\",<.>/?`~\\|";

    for (let i = 0; i < length; i++) {
      let chunk = Math.floor(Math.random() * str.length + 1);

      pass += str[chunk];
    }

    setPassword(pass);
  }, [length, withChar, withNumber, setPassword]);


  const copypassword = useCallback(() => {
    passRef.current?.select();                                // selecting whole input box
    // passRef.current?.setSelectionRange(0,4);              // for selecting only specific value
    window.navigator.clipboard.writeText(password);
  }, [password]);


  useEffect(() => {
    passGenrator();
  }, [length, withChar, withNumber, passGenrator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-600 bg-gray-800">
        <h1 className="text-white text-center my-3"> Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            ref={passRef}
            readOnly
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer"
            onClick={copypassword}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-3.5">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1.5">
            <input
              type="checkbox"
              defaultChecked={withNumber}
              className="cursor-pointer"
              onChange={() => {
                setWithNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1.5">
            <input
              type="checkbox"
              defaultChecked={withChar}
              className="cursor-pointer"
              onChange={() => {
                setWithChar((prev) => !prev);
              }}
            />
            <label htmlFor="CharacterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
