import TodoTypes from './todo';

const LOCAL_STORAGE_KEY = 'todos';

const TodoService = {
  getTodos: (): TodoTypes[] => {
    const todoStr: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
    return todoStr ? JSON.parse(todoStr) : [];
  },
  addTodos: (text: string): TodoTypes => {
    const todos: TodoTypes[] = TodoService.getTodos();
    const newTodo: TodoTypes = {
      id: todos.length + 1,
      text,
      completed: false,
      timeLeft: '',
    };

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...todos, newTodo])
    );

    return newTodo;
  },
  updateTodos: (todo: TodoTypes): TodoTypes[] => {
    const todos: TodoTypes[] = TodoService.getTodos();
    const newTodos: TodoTypes[] = todos.map((t) =>
      t.id === todo.id ? todo : t
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos));
    return newTodos;
  },

  deleteTodo: (id: number): TodoTypes[] => {
    const todos: TodoTypes[] = TodoService.getTodos();
    const newTodos = todos.filter((t) => t.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos));
    return newTodos;
  },
};

export default TodoService;
