import React from "react";
import { Task } from "../types";
import Todo from "./Todo";

interface TodoListProps {
  todos: Task[];
  onDelete: (id: string) => void; // 削除処理を受け取る
  onEdit: (id: string, newText: string) => void;
}

const TodoList = ({ todos, onDelete, onEdit }: TodoListProps) => {
  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
};

export default TodoList;
