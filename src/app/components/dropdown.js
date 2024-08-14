import { useState } from 'react';

const Dropdown = ({ total, onSeasonSelect, selectedSeason }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSeasonClick = (season) => {
    onSeasonSelect(season);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="m-1 relative inline-flex">
      <button
        id="hs-dropdown-item-checkbox"
        type="button"
        className="py-3 px-4 inline-flex items-center gap-x-2 text-lg font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Dropdown"
        onClick={toggleDropdown}
      >
         Season {selectedSeason.seasonnumber}
        <svg
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute z-10 mt-12 min-w-[150px] bg-white shadow-md rounded-lg p-1 space-y-0.5 dark:bg-neutral-800 dark:border dark:border-neutral-700"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="hs-dropdown-item-checkbox"
        >
          {total.map((a, index) => (
            <div
              key={index}
              className="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer"
              onClick={() => handleSeasonClick(a)}
            >
              Season {a.seasonnumber}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
