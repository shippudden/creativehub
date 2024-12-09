import { useState } from "react";
import { FaInfoCircle, FaPlus } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { motion, AnimatePresence } from "framer-motion";

export default function Card() {
    const [tags, setTags] = useState([])  // State to store tags
    const [inputValue, setInputValue] = useState('') // track input value

    // handling add tags
    const addTag = () => {
        if (inputValue.trim() && !tags.includes(inputValue) && tags.length < 8) {
            setTags([...tags, inputValue.trim()])
            setInputValue('') // clears input value
        }
    }

      // Handle removing tags
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle "Enter" key press to add tags
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="p-6 shadow-lg sm:w-[90%] md:w-[50%] lg:w-[30%] xl:w-[35%]] h-auto rounded-2xl bg-white space-y-8 mx-auto my-14">
        <h2 className="flex flex-row items-center gap-2 text-lg font-semibold mb-4">Add Tags (max. 8) <FaInfoCircle className="text-gray-500"/> </h2>

         {/* Input field with Add button */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Add tags..."
          className="w-full px-4 py-4 border rounded-xl focus:ring focus:ring-blue-300 shadow-md"
          disabled={tags.length >= 8} // Disable input if max tags is reached
        />
        <button
          onClick={addTag}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 p-2 rounded-lg shadow-md border hover:bg-gray-100 duration-500"
          disabled={tags.length >= 8} // Disable button if max tags is reached
        >
          <FaPlus />
        </button>
      </div>

      {/* Display tags */}
      <div className="flex flex-wrap gap-4 mt-4">
      <AnimatePresence>
          {tags.map((tag) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-lg shadow-md hover:bg-transparent border duration-500 cursor-pointer"
            >
              <span>{tag}</span>
              <button
                onClick={() => removeTag(tag)}
                className="text-black"
              >
                <LiaTimesSolid />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Tag limit message */}
      {tags.length >= 8 && (
        <p className="text-sm text-red-500 mt-2">Maximum of 8 tags allowed.</p>
      )}

        <div className="flex flex-col gap-2 border-b-2 border-dashed pb-4">
            <p className="text-lg font-semibold">Members with access</p>

            <div className="flex flex-row gap-2">
                <input className="cursor-pointer" type="checkbox" id="checkbox" />
                
                <div className="flex flex-row gap-1 items-center">
                    <p className="font-medium text-gray-500 mr-2">Display On Profle</p>
                    <p className="font-semibold text-red-600 bg-red-100 px-4 py-1 rounded-md text-sm">NEW</p>
                </div>
            </div>

            <div className="flex flex-row gap-2">
                <input className="cursor-pointer" type="checkbox" id="checkbox" />
                
                <div className="flex flex-row gap-1 items-center">
                    <p className="font-medium text-gray-500">Disable Commenting</p>
                </div>
            </div>
        </div>

        <div className="border-b-2 flex flex-row border-dashed pb-4 items-center justify-between">
    	    <div className="flex flex-col">
                <p className="font-medium">Add to portfolio</p>
                <p className="text-gray-400">Choose a portfolio</p>
            </div>

            <div className="items-end">
                <button className="px-5 rounded-lg border-2 py-2 shadow-md text-gray-500 hover:bg-slate-100 duration-500">Choose</button>
            </div>
        </div>

        <div className="flex flex-row border-dashed pb-4 items-center justify-between">
    	    <div className="flex flex-col">
                <p className="font-medium">Add Download File</p>
                <p className="text-gray-400">Share your file and allow downloads</p>
            </div>

            <div className="items-end">
                <button className="px-5 rounded-lg border-2 py-2 shadow-md text-gray-500 hover:bg-slate-100 duration-500">Add</button>
            </div>
        </div>
    </div>
  )
}
