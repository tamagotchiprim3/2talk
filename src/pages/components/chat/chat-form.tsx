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
    onPromptSubmit({
      from: "Me",
      message: form?.message,
      id: uuidv4(),
    });
    setForm(null);
  }

  return (
    <div className="bg-teal-700 h-1/4 rounded-3xl p-6">
      <form onSubmit={promptSubmit} className="w-full h-full flex gap-3">
        <textarea
          id="promptInput"
          value={form?.message ? form.message : ""}
          onChange={handleChange}
          className="bg-teal-700 block w-full h-full resize-none flex-1 rounded-lg p-3 hover:border-none hover:outline-none focus:border-none focus:outline-none "
        />
        <button type="submit" className="bg-teal-600 w-1/6 rounded-lg hover:bg-teal-400">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChatForm;