"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Task } from "../types";

interface AddTaskProps {
  onAddTask: (task: Task) => void; // タスクを追加する関数を親から受け取る
}

const AddTask = ({ onAddTask }: AddTaskProps) => {
  const [taskTitle, setTaskTitle] = useState<string>(""); // 新しいタスクの入力

  const handleSubmit = async (e: FormEvent) => { //handleSubmit: ユーザーが送信ボタンを押した時に実行される関数
    e.preventDefault(); // フォーム送信時のリロードを防ぐ

    const newTask: Task = { id: uuidV4(), text: taskTitle }; // タスク作成
    onAddTask(newTask); // 親コンポーネントに新しいタスクを渡す
    setTaskTitle(""); // 入力フィールドをクリア
  };

  return (
    <form className="mb-4 space-y-3" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
        placeholder="新しいタスクを入力してください"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTaskTitle(e.target.value)
        }
        value={taskTitle}
      />
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded transform hover:bg-blue-400 hover:scale-95 duration-200"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
