import React, { useState } from "react";
import { Task } from "../types";

interface TodoProps {
  todo: Task;
  onDelete: (id: string) => void; // 削除処理
  onEdit: (id: string, newText: string) => void; // 編集処理
}

const Todo = ({ todo, onDelete, onEdit }: TodoProps) => {
  const [isEditing, setIsEditing] = useState(false); // 編集モードを管理
  const [editText, setEditText] = useState(todo.text); // 編集中のテキストを管理

  // 編集を保存する処理
  const handleSave = () => {
    if (editText.trim() !== "") {
      onEdit(todo.id, editText); // 親コンポーネントに編集内容を通知
      setIsEditing(false); // 編集モードを終了
    }
  };

  // 編集をキャンセルする処理
  const handleCancel = () => {
    setEditText(todo.text); // 元のテキストに戻す
    setIsEditing(false); // 編集モードを終了
  };

  return (
    <li
      key={todo.id}
      className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow"
    >
      {/* 編集モードの切り替え */}
      {isEditing ? (
        <input
          type="text"
          className="w-full border px-2 py-1 rounded focus:outline-none focus:border-blue-400"
          value={editText}
          onChange={(e) => setEditText(e.target.value)} // テキストの変更を監視
        />
      ) : (
        <span>{todo.text}</span>
      )}

      <div className="flex space-x-2">
        {/* 編集中かどうかでボタンを切り替え */}
        {isEditing ? (
          <>
            <button className="text-blue-500" onClick={handleSave}>
              Save
            </button>
            <button className="text-gray-500" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="text-green-500"
              onClick={() => setIsEditing(true)} // 編集モードに切り替え
            >
              Edit
            </button>
            <button
              className="text-red-500"
              onClick={() => onDelete(todo.id)} // 削除処理を呼び出す
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default Todo;
