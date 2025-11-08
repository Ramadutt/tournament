
import React from 'react';

interface TabSwitcherProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex bg-gray-800 p-1 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`w-full py-2 px-4 text-sm font-semibold rounded-md transition-colors duration-300 ${
            activeTab === tab ? 'bg-teal-500 text-white' : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher;
