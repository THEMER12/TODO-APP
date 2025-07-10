import { useState } from 'react';

interface DeleteTasksProps {
  onTasksDeleted: () => void;
  tasks?: any[];
}

export default function DeleteTasks({ onTasksDeleted }: DeleteTasksProps) {
  const [ids, setIds] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const idsArray = ids
      .split(',')
      .map(id => id.trim())
      .filter(id => /^\d+$/.test(id))
      .map(Number);

    if (idsArray.length === 0) {
      setShowError(true);
      return;
    }

    setShowError(false);

    fetch('http://127.0.0.1:8000/deleteTasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: idsArray }),
    })
      .then(res => {
        if (!res.ok) throw new Error('error when deleting tasks');
        return res.json();
      })
      .then(() => {
        setIds('');
        onTasksDeleted();
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 w-3/4 max-w-md mx-auto bg-[#E3B6CB] p-6 rounded shadow"
    >
      <h2 className="text-6xl text-center underline font-bold mb-10">Delete Tasks</h2>

      <input
        type="text"
        placeholder="Ej: 1,2,3,4,5"
        className="px-4 py-2 border rounded bg-white"
        value={ids}
        onChange={(e) => {
          setIds(e.target.value);
          if (showError) setShowError(false);
        }}
        required
      />
      {showError && (
        <p className="text-red-600 font-semibold rounded-lg px-2 py-2 bg-black text-center">
          please enter at least one valid integer ID separated by commas.
        </p>
      )}
      <button
        type="submit"
        className="px-4 py-2 rounded bg-[#14453D] text-[#E3B6CB] hover:bg-[#53A548] hover:text-black"
      >
        Delete Tasks
      </button>
    </form>
  );
}
