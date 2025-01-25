"use client";

import React, { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { Task } from "./types";

const Home = () => {
  const [todos, setTodos] = useState<Task[]>([]); // タスクの状態を管理

  // 初期データをJSONファイルから取得
  useEffect(() => { //初期データを取得
    const fetchTodos = async () => {
      try {
        const response = await fetch("/todos.json"); // JSONファイルを取得
        const data = await response.json(); // JSONデータを取得
        setTodos(data.tasks); // タスクを状態に設定
      } catch (error) {
        console.error("エラーです", error);
      }
    };

    fetchTodos();
  }, []); // 初回レンダリング時のみ実行

  // 新しいタスクを追加
  const addTask = (newTask: Task) => {
    setTodos((prevTodos) => [...prevTodos, newTask]); //配列をコピーして末尾のnewTaskを追加
  };

  // 指定したタスクを削除
  const deleteTask = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    //filter関数：指定されたID以外のタスクを残す
  };

  // タスクを編集
  const editTask = (id: string, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
    //todo.id === idの場合、該当タスクのtext更新
      )
    );
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <h1 className="text-4xl font-bold text-gray-700 mb-5">
        Next.js 13 Todo App
      </h1>
      <div className="w-full max-w-xl">
        <div className="w-full px-8 py-6 bg-white shadow-md rounded-lg">
          <AddTask onAddTask={addTask} /> {/* タスク追加関数を渡す */}
          <TodoList todos={todos} onDelete={deleteTask} onEdit={editTask} />
          {/* タスクリスト、削除、編集関数を渡す */}
        </div>
      </div>
    </main>
  );
};

export default Home;
