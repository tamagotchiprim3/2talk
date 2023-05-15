import Image from "next/image";
import React from "react";
import backIcon from ".//../../../../public/icons/back-icon.svg";
const MobileChatHeader: React.FC<{ name: string; onBackToList: any }> = ({
  name,
  onBackToList,
}) => {
  const backToList = () => {
    onBackToList();
  };
  return (
    <div className="bg-teal-800 h-20 flex justify-between items-center px-2">
      <button
        onClick={backToList}
        className="bg-teal-700 rounded-full h-10 w-10 flex justify-center items-center"
      >
        <Image src={backIcon} alt="" className="w-3/4 h-3/4" />
      </button>
      <div className="flex justify-center items-center">
        <button>
          <span>{name}</span>
        </button>
      </div>
    </div>
  );
};

export default MobileChatHeader;
