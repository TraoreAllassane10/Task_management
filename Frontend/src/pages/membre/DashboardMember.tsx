import DifficultyBarChart from "../../components/dashboard/DifficultyBarChart";
import RecentTasksTable from "../../components/dashboard/RecentTasksTable";
import TaskProgressChart from "../../components/dashboard/TaskProgressChart";
import DashbaordLayout from "../../layout/DashbaordLayout"


const DashboardMember = () => {
   const chartData = [
    { name: "En attente", value: 10 },
    { name: "En progression", value: 5 },
    { name: "Terminée", value: 20 },
  ];

  const DifficultychartData = [
    { name: "Facile", value: 10 },
    { name: "Normale", value: 5 },
    { name: "Difficile", value: 20 },
  ];

  const tasks = [
    {
      tache: "Créer API Laravel",
      difficulte: "Difficile",
      date_debut: "2026-02-10",
      date_fin: "2026-02-15",
    },
    {
      tache: "Dashboard React",
      difficulte: "Normale",
      date_debut: "2026-02-12",
      date_fin: "2026-02-20",
    },
  ];

  return (
    <DashbaordLayout>
      {/* Statistique */}
      <div className="bg-white w-full p-4 rounded mb-6">
        <h1>Bonjour Traore Allassane</h1>
        <div className="flex gap-4 my-2">
          <p className="flex gap-1">
            <span>
              <span className="px-0.5 py.0.5 bg-blue-500 rounded-t-lg mr-1">
                {" "}
              </span>{" "}
              10
            </span>
            <span>en attente</span>
          </p>
          <p className="flex gap-1">
            <span>
              <span className="px-0.5 py.0.5 bg-yellow-500 rounded-t-lg mr-1">
                {" "}
              </span>{" "}
              5
            </span>
            <span>en progession</span>
          </p>
          <p className="flex gap-1">
            <span>
              <span className="px-0.5 py.0.5 bg-red-500 rounded-t-lg mr-1">
                {" "}
              </span>{" "}
              5
            </span>
            <span>termineé(s)</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
        <TaskProgressChart data={chartData} />
        <DifficultyBarChart data={DifficultychartData} />
      </div>

      <RecentTasksTable tasks={tasks} />
    </DashbaordLayout>
  );
}

export default DashboardMember