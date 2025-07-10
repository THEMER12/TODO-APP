import { useEffect, useState } from 'react';
import './App.css';
import TasksTable from './components/TasksTable';
import NewTasks from './components/newTasks';
import DeleteTask from './components/DeleteTasks';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);

  const fetchTasks = () => {
    fetch('http://127.0.0.1:8000/getTasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onTaskAdded = () => {
    fetchTasks();
    setShowForm(false);
  };

  const onTasksDeleted = () => {
    fetchTasks();
    setShowDelete(false);
  };

  return (
    <main className="flex flex-col md:flex-row w-screen h-screen">
      {showForm && (
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center">
          <NewTasks onTaskAdded={onTaskAdded} />
        </div>
      )}

      {showDelete && (
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center">
          <DeleteTask tasks={tasks} onTasksDeleted={onTasksDeleted} />
        </div>
      )}

      {!showForm && !showDelete && (
        <div id="name" className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center">
          <h1 className="text-5xl md:text-9xl font-bold underline text-[#E3B6CB] text-center">
            TODO <br /> APP
          </h1>
        </div>
      )}

      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-center justify-center bg-[#E3B6CB]">
        <TasksTable tasks={tasks} />
        <div className="mt-4 flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
          <button
            className="bg-[#14453D] text-[#E3B6CB] py-4 px-6 rounded-lg hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              setShowForm(true);
              setShowDelete(false);
            }}
            disabled={showForm}
          >
            Add Task
          </button>
          <button
            className="bg-[#14453D] text-[#E3B6CB] py-4 px-6 rounded-lg hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              setShowDelete(true);
              setShowForm(false);
            }}
            disabled={showDelete}
          >
            Delete Task
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
