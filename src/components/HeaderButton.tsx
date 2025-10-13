import clsx from "clsx";
import React from "react";

interface HeaderButtonProps {
  title: string;
  language: "english" | "japanese" | "spanish";
  activeTab: string;
  setActiveTab: (lang: "english" | "japanese" | "spanish") => void;
  className?: string;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  title,
  language,
  activeTab,
  setActiveTab,
  className,
}) => {
  return (
    <button
      className={clsx(
        "justify-between bg-slate-800 shadow-md p-2 border-b-2 rounded active:scale-[98%]",
        {
          "border-slate-100 bg-gradient-to-b from-red-500 to-red-700":
            activeTab === language,
        },
        { "border-transparent": activeTab !== language },
        className
      )}
      onClick={() => {
        setActiveTab(language);
        // setTabName(language)
      }}
    >
      {title}
    </button>
  );
};

export default HeaderButton;
