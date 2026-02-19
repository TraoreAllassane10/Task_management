export default function RecentTasksTable({ tasks }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 w-full">
      <h3 className="text-lg font-semibold mb-6">
        Tâches récentes
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          
          {/* Header */}
          <thead className="text-gray-500 border-b border-gray-200">
            <tr>
              <th className="pb-3 font-medium">Tâche</th>
              <th className="pb-3 font-medium">Difficulté</th>
              <th className="pb-3 font-medium">Date début</th>
              <th className="pb-3 font-medium">Date fin</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-200">
            {tasks && tasks.length > 0 ? (
              tasks.map((task: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="py-4 font-medium text-gray-800">
                    {task.tache}
                  </td>

                  <td className="py-4">
                    <DifficultyBadge level={task.difficulte} />
                  </td>

                  <td className="py-4 text-gray-600">
                    {task.date_debut}
                  </td>

                  <td className="py-4 text-gray-600">
                    {task.date_fin}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-6 text-center text-gray-400"
                >
                  Aucune tâche récente
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DifficultyBadge({ level }: any) {
  const base =
    "px-3 py-1 rounded-full text-xs font-medium";

  if (level === "Facile") {
    return (
      <span className={`${base} bg-green-100 text-green-700`}>
        Facile
      </span>
    );
  }

  if (level === "Normale") {
    return (
      <span className={`${base} bg-yellow-100 text-yellow-700`}>
        Normale
      </span>
    );
  }

  return (
    <span className={`${base} bg-red-100 text-red-700`}>
      Difficile
    </span>
  );
}
