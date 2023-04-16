import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IMessage } from "../../../../public/interfaces/message.interface";

interface Props {
  onPromptSubmit: Function;
}

const ChatForm: React.FC<Props> = ({ onPromptSubmit }) => {
  const [form, setForm] = useState<IMessage | null>(null);

  const handleChange = (e: any) => {
    e.preventDefault();
    setForm({
      message: e.target.value,
    });
  };

  function promptSubmit(e: any) {
    e.preventDefault();
    if (form?.message) {
      onPromptSubmit({
        from: "Me",
        message: form?.message,
        id: uuidv4(),
      });
      setForm(null);
    }
  }

  return (
    <div className="bg-teal-900 h-1/4 rounded-3xl p-6 shadow-2xl">
      <form onSubmit={promptSubmit} className="w-full h-full flex gap-3">
        <textarea
          id="promptInput"
          value={form?.message ? form.message : ""}
          onChange={handleChange}
          className="text-white bg-teal-900 block w-full h-full resize-none flex-1 rounded-lg p-3 hover:border-none hover:outline-none focus:border-none focus:outline-none scrollbar"
        />
        <button
          type="submit"
          className="transition bg-teal-700 w-1/6 rounded-lg hover:bg-teal-400 hover:scale-110 hover:shadow-inner"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
