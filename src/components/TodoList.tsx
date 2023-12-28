import { useState } from 'react';
import TodoTypes from '../todo';
import TodoService from '../TodoService';
import { FaEdit, FaCheck } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { RiDeleteBin5Fill } from 'react-icons/ri';

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string | null>(null);

  const handleEditStart = (id: number, text: string): void => {
    setEditId(id);
    setEditText(text);
  };

  const handleEditCancel = (): void => {
    setEditId(null);
    setEditText(null);
  };

  const handleEditSave = (id: number): void => {
    if (editText?.trim()) {
      setTodos(
        TodoService.updateTodos({
          id,
          text: editText,
          completed: false,
          timeLeft: '',
        })
      );
      setEditId(null);
      setEditText(null);
    }
  };

  const handleDeleteTodo = (id: number): void => {
    const newTodos: TodoTypes[] = TodoService.deleteTodo(id);
    setTodos(newTodos);
  };
  return (
    <div>
      <div>{/*Todo Container*/}</div>
      {todos.map((todo: TodoTypes) => (
        <div key={todo.id}>
          {editId === todo.id ? (
            <div>
              <input
                title='todo'
                type='text'
                value={editText as string}
                onChange={(e) => setEditText(e.target.value)}
                autoFocus
              />
              <button
                title='todo button'
                onClick={() => handleEditSave(todo.id)}
              >
                <FaCheck />
              </button>
              <button title='todo button' onClick={() => handleEditCancel()}>
                <GiCancel />
              </button>
            </div>
          ) : (
            <div>
              <span>{todo.text}</span>
              <button
                title='todo button'
                onClick={() => handleEditStart(todo.id, todo.text)}
              >
                <FaEdit />
              </button>
            </div>
          )}

          <button title='button' onClick={() => handleDeleteTodo(todo.id)}>
            <RiDeleteBin5Fill />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
