import React from "react";
import { FaSearch } from "react-icons/fa";
import { Button } from "@mui/material";

interface SearchProps {
  setSearchMode: (mode: boolean) => void;
  isDarkMode: boolean;
}

const Search: React.FC<SearchProps> = ({ setSearchMode, isDarkMode }) => {
  return (
    <div className="w-full h-screen backdrop-blur-xl text-white fixed top-0 left-0 z-50 p-6 flex items-center justify-center">
      <div
        className={`w-full h-96 max-w-xl mx-auto border border-gray-600  p-2 xs:p-4 sm:p-5 rounded-lg`}
      >
        <div className="w-full flex items-center justify-between bg-purple-500/20 px-4 rounded-lg">
          <div className="w-full flex items-center gap-3">
            <FaSearch
              size={18}
              className={`${isDarkMode ? "text-gray-300" : "text-gray-500"}`}
            />
            <input
              type="text"
              className={`py-2 outline-none w-full xs:w-[80%] ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              placeholder="Search your query"
            />
          </div>
          <Button
            onClick={() => setSearchMode(false)}
            className="rounded-full"
            variant="text"
          >
            Esc
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Search;
