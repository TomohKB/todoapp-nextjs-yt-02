"use client";

import Image from "next/image";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { getAllTodos } from "./api";
import { useEffect, useState } from "react";
import { Task } from "./types";


export default function Home() {
const [todos, setTodos] = useState<Task[]>([]);
  // const todos = await getAllTodos();
  useEffect(() => { //画面ロード時、データの取得処理がが走る
    const fetchTasks = async () => {
      try {
        const res = await getAllTodos();
        setTodos(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
    
  },[]);
  console.log(todos);
  
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <h1 className="text-4xl font-bold text-gray-700">Nextjs 13 Todo App</h1>
      <div className="w-full max-w-xl mt-5">
        <div className="w-full px-8 py-6 bg-white shadow-md rounded-lg">
          <AddTask />
          <TodoList todos={todos} />
        </div>
      </div>
    </main>
  );
}
