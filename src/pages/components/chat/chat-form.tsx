import Image from "next/image";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import sendMessage from "../../../../public/icons/send-icon.svg";
import { IMessage } from "../../../../public/interfaces/message.interface";

interface Props {
  onPromptSubmit: Function;
}

const ChatForm: React.FC<Props> = ({ onPromptSubmit }) => {
  const [form, setForm] = useState<IMessage | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: any) => {
    e.preventDefault();
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${e.target.scrollHeight - 16}px`;
    }
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
    <div className="bg-teal-900  rounded-2xl m-2 p-2  shadow-2xl">
      <form onSubmit={promptSubmit} className=" flex gap-2">
        <textarea
          id="promptInput"
          ref={textareaRef}
          rows={1}
          value={form?.message ? form.message : ""}
          onChange={handleChange}
          className="text-white bg-teal-900 w-full block resize-none  rounded-lg p-2 hover:border-none hover:outline-none focus:border-none focus:outline-none overflow-hidden"
        />
        <button
          type="submit"
          className={
            form?.message
              ? "bg-teal-400 scale-110 shadow-inner transition ease-in-out   rounded-full p-3"
              : "transition ease-in-out bg-teal-700  rounded-full p-3"
          }
        >
          <Image src={sendMessage} alt="" width={20} height={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
