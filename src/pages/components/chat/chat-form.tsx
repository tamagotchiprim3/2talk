import Image from "next/image";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import sendMessage from "../../../../public/icons/send-icon.svg";

interface Props {
  onPromptSubmit: Function;
}

const ChatForm: React.FC<Props> = ({ onPromptSubmit }) => {
  const [form, setForm] = useState<{ content: string } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: any) => {
    e.preventDefault();
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${e.target.scrollHeight}px`;
    }
    setForm({
      content: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (form?.content) {
      onPromptSubmit({
        role: "user",
        content: form?.content,
        id: uuidv4(),
      });
      setForm(null);
    }
  };

  const handleKeypress = (e: any) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-teal-900  rounded-2xl m-2 pl-2 p-1  shadow-2xl max-h-96">
      <form onSubmit={handleSubmit} className="flex h-full w-full">
        <textarea
          id="promptInput"
          ref={textareaRef}
          rows={1}
          value={form?.content ? form.content : ""}
          onChange={handleChange}
          onKeyDown={handleKeypress}
          className="text-white bg-teal-900 w-full  block resize-none px-2 rounded-lg  hover:border-none hover:outline-none focus:border-none focus:outline-none blank-scrollbar"
        />
        <button
          type="submit"
          className={
            "bg-teal-700 shadow-inner h-7 w-7 rounded-full p-3 flex justify-center items-center"
          }
        >
          <Image src={sendMessage} alt="" width={12} height={12} className="h-3 w-3 max-w-none" />
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
