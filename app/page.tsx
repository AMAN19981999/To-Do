import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-400 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-2xl grid gap-6 sm:grid-cols-1 md:grid-cols-2 bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-200">
        {/* Header Section */}
        <div className="col-span-full text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">📝 Task Manager</h1>
          <p className="text-gray-700">Stay organized. Get things done.</p>
        </div>

        {/* Task List Section */}
        <div className="sm:col-span-1 md:col-span-2 bg-white rounded-xl shadow p-4 transition-all hover:shadow-lg hover:scale-[1.01]">
          <TaskList />
        </div>
      </div>
    </main>
  );
}