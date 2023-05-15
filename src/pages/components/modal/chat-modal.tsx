import { useState } from "react";

const ChatModal: React.FC<{ name: string | null }> = ({ name }) => {
  const [nameInput, setNameInput] = useState<string | null>(name);

  const handleChange = (e: any) => {
    e.preventDefault();
    setNameInput(e.target.value);
  };

  const closeModal = () => {};
  const changeName = () => {};
  return (
    <div className="h-full w-full flex justify-center items-center fixed bg-black bg-opacity-50">
      <div className="bg-teal-700 h-52 w-3/4 p-2 flex flex-col justify-center">
        <div
          className="text-teal-50 text-xl h-2/5 flex justify-center items-center
        "
        >
          Name
        </div>
        <div className="h-1/5">
          <input
            type="text"
            value={nameInput ? nameInput : ""}
            onChange={handleChange}
            className="bg-teal-600 rounded-xl w-full h-full p-1 hover:border-none hover:outline-none focus:border-none focus:outline-none "
          />
        </div>
        <div className="h-2/5 flex">
          <div className="w-1/2 h-full p-2 flex justify-center items-center">
            <button
              onClick={closeModal}
              className="bg-teal-500 w-full h-full rounded-2xl shadow-inner"
            >
              back
            </button>
          </div>
          <div className="w-1/2 h-full p-2 flex justify-center items-center">
            <button
              onClick={changeName}
              className="bg-teal-500 w-full h-full rounded-2xl shadow-inner"
            >
              change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
