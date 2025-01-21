"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { addTodo, getAllTodos } from '../api';
import {v4 as uuidV4} from "uuid"
import { Task } from "../types";

const AddTask = () => {
  const [taskTitle, setTaskTitle] = useState<string>(""); //新しいタスクの入力
  // const [todos, setTodos] = useState<Task[]>([]); //タスクリスト

  // //初回レンダリング時にタスクを取得
  // useEffect(() => {
  //   const fetchTodos = async() => {
  //     const todosData: Task[] = await getAllTodos();
  //     setTodos(todosData); //取得したタスクを状態に保存
  //   };

  //   fetchTodos();
  // }, []);

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();

    const newTask = { id: uuidV4(), text: taskTitle };
    await addTodo(newTask);

    // setTodos((prevTodos) => [...prevTodos, newTask]);
    setTaskTitle("");
  };


  return (
    <form className='mb-4 space-y-3' onSubmit={handleSubmit}>
        <input 
            type='text' 
            className='w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400'
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value)
            }
            value={taskTitle}
        />
        <button className='w-full px-4 py-2 text-white bg-blue-500 rounded trasform hover:bg-blue-400 hover:scale-95 duration-200'>Add Task</button>
    </form>
  );
};

export default AddTask;