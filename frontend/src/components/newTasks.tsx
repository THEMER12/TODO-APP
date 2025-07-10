import { useState } from 'react';

interface NewTasksProps {
  onTaskAdded: () => void;
}

export default function NewTasks({ onTaskAdded }: NewTasksProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false);

    fetch('http://127.0.0.1:8000/addTask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('error adding the task');
        return res.json();
      })
      .then(() => {
        setTitle('');
        setDescription('');
        onTaskAdded();
      })
      .catch(() => {
        setShowError(true);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 w-3/4 max-w-md mx-auto bg-[#E3B6CB] p-6 rounded shadow"
    >
      <h2 className="text-6xl text-center underline font-bold mb-10">New Task</h2>

      <input
        type="text"
        placeholder="Title"
        className="px-4 py-2 border rounded bg-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        className="px-4 py-2 border rounded bg-[#1B2527] text-[#E3B6CB] hover:border-black"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      {showError && (
        <p className="text-red-600 font-semibold rounded-lg px-2 py-2 bg-black text-center">
          error adding the task. Please try again.
        </p>
      )}
      <button
        type="submit"
        className="px-4 py-2 bg-[#14453D] text-[#E3B6CB] rounded hover:bg-[#53A548] hover:text-black"
      >
        Save Task
      </button>
    </form>
  );
}
