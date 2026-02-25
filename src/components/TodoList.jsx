import React from "react";

function TodoList() {
  return (
    <div className="w-full pt-10">
      <div className="max-w-150 mx-auto bg-gray-200 px-3 py-6 rounded-sm">
        <h2 className="font-serif text-3xl font-semibold text-center mb-6">
          Todo-List
        </h2>

        <form>
          <div>
            <input
              className="w-full bg-white py-2 px-2 border border-green-500 rounded-2xl"
              type="text"
              placeholder="Enter Your Task"
            />
          </div>
          <div>
            <input
              type="submit"
              className="cursor-pointer text-xl px-3 py-2.5 mt-6 w-full bg-red-500 rounded-2xl text-white font-semibold font-sans hover:bg-red-600 duration-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoList;
