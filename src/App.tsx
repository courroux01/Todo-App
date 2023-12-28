import { FaClipboardList, FaPen } from 'react-icons/fa';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className='flex text-neutral-900'>
      <div className='header'>
        <div className='logosize'>
          <FaPen />
          <h1>What To Do?</h1>
          <FaClipboardList />
        </div>
      </div>
      <TodoList />
    </div>
  );
}

export default App;
