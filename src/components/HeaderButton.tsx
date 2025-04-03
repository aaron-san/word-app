import clsx from 'clsx';
import React from 'react'

const HeaderButton = ({
    title,
    language,
    activeTab,
    setActiveTab
  }: {
    title: string;
    language: string;
    activeTab: string;
    setActiveTab: (lang:string) => void;
  }) => {
    return (
      <button
        className={clsx(
          "p-2 border-b-2 rounded shadow-md bg-slate-800 active:scale-[98%] justify-between",
          { "border-slate-100": activeTab === language },
          { "border-transparent": activeTab !== language }
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

export default HeaderButton