import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";

function TodoList() {
  const [task, setTask] = useState("");
  const [alltask, setAlltask] = useState([]);
  const [edit, setEdit] = useState(false);
  const [updateTask, setUpdateTask] = useState("");
  const [updateId, setUpdateId] = useState("");

  const hendleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      alert("Please Enter Your Task");
      return;
    } else {
      axios
        .post("http://localhost:7000/todo", {
          name: task,
        })
        .then(() => {
          setTask("");
          toast.success("Task Added Successfully");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:7000/alltodos")
      .then((res) => {
        setAlltask(res.data.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [task]);

  console.log(alltask);

  // hendle delet button
  const hendleDelet = (id) => {
    const confirm = window.confirm("Are You Sure To Delet This Task ?");
    if (!confirm) {
      return;
    } else {
      axios
        .delete(`http://localhost:7000/delettodo/${id}`)
        .then(() => {
          toast.success("Task Delet Successfully");
          window.location.reload();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  // update function
  const editbox = (id) => {
    setUpdateId(id);
    setEdit(!edit);
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      hendleupdateBtn();
    }
  };

  const hendleupdateBtn = () => {
    if (!updateTask) {
      alert("Please Enter Your Task");
      return;
    } else {
      axios
        .patch(`http://localhost:7000/updateTask/${updateId}`, {
          name: updateTask,
        })
        .then(() => {
          setEdit(false);
          toast.success("task Updated Successfully");
          window.location.reload();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <div className="w-full pt-10 relative">
      <div className="max-w-150 mx-auto bg-gray-200 px-3 py-6 rounded-sm">
        <h2 className="font-serif text-3xl font-semibold text-center mb-6">
          Todo-List
        </h2>

        <form onSubmit={hendleSubmit}>
          <div>
            <input
              className="w-full bg-white py-2 px-2 border border-green-500 rounded-2xl"
              type="text"
              value={task}
              placeholder="Enter Your Task"
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div>
            <input
              type="submit"
              className="cursor-pointer text-xl px-3 py-2.5 mt-6 w-full bg-red-500 rounded-2xl text-white font-semibold font-sans hover:bg-red-600 duration-300"
            />
          </div>
        </form>

        <div className="mt-5">
          <ul>
            {alltask.map((item) => (
              <li
                key={item._id}
                className="text-lg font-medium capitalize bg-white rounded-2xl py-2 px-4 mb-3 flex items-center justify-between"
              >
                <div>{item.title}</div>

                <div className="flex items-center gap-4">
                  <span>
                    <FaEdit
                      className="text-green-700 cursor-pointer"
                      onClick={() => editbox(item._id)}
                    />
                  </span>
                  <span>
                    <MdDelete
                      className="text-red-600 cursor-pointer"
                      onClick={() => hendleDelet(item._id)}
                    />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {edit && (
        <div className="bg-black w-150 h-full mx-auto  absolute top-10 left-1/2 -translate-x-1/2 border border-red-500 px-5 py-20 rounded-md">
          <div className="flex relative">
            <input
              type="text"
              className="bg-gray-100 rounded-2xl  w-full py-2 px-5"
              placeholder="Update Your Task"
              value={updateTask}
              onKeyDown={handleEnterKeyPress}
              onChange={(e) => setUpdateTask(e.target.value)}
              autoFocus
            />
            <input
              type="submit"
              value="Update Task"
              className="bg-green-700 py-2 px-5 absolute right-0 rounded-r-2xl cursor-pointer"
              onClick={hendleupdateBtn}
            />
          </div>
          <button>
            <TiDeleteOutline
              className="text-red-600  absolute top-0 right-0 text-3xl cursor-pointer"
              onClick={() => setEdit(false)}
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoList;
