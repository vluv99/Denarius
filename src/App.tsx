import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./contexts/Context";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./utils/firebase";

//define the task type
type Task = {
  title: string;
  completed: boolean;
  id: string;
}[];

export default function App() {
  const [title, setTitle] = useState<string>("");
  const { userId } = useGlobalContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title !== "") {
      try {
        await addDoc(collection(db, "users", userId, "tasks"), {
          title,
          completed: false,
        });
        setTitle("");
        console.log("Task successfully added");
      } catch (e) {
        console.error("Unsuccessful", e);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <div
        style={{
          width: "300px",
        }}
      >
        <p>Todo List App</p>
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "5px",
          }}
        >
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </form>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <label>
            <input type="checkbox" />
            Finish To-do list tutorial
          </label>
          <button>Delete</button>
        </div>
      </div>
      {/* footer */}

      <footer
        style={{
          marginTop: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <p>0 items left</p>
          <button>Clear Completed</button>
        </div>
      </footer>
    </div>
  );
}
