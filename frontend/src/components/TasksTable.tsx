interface Task {
  id: number;
  title: string;
  description: string;
}

interface TasksTableProps {
  tasks: Task[];
}

export default function TasksTable({ tasks }: TasksTableProps) {
  if (!tasks) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-6xl text-center underline font-bold mb-10">Tasks</h2>
      <table className="min-w-full border-collapse border border-black">
        <thead>
          <tr className="bg-gray-100 text-3xl">
            <th className="border border-black px-4 py-2">ID</th>
            <th className="border border-black px-4 py-2">Title</th>
            <th className="border border-black px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4">
                No tasks found.
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr
                className="text-3xl text-[#E3B6CB] text-center bg-[#1B2527]"
                key={task.id}
              >
                <td className="border border-black px-4 py-2">{task.id}</td>
                <td className="border uppercase border-black px-4 py-2">{task.title}</td>
                <td className="border border-black px-4 py-2">{task.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
