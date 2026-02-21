import { useFlow } from "fractostate";
import DashbaordLayout from "../../layout/DashbaordLayout";
import { TaskFlow } from "../../flows/taskFlow";
import Task from "../../components/tasks/Task";
import { useEffect, useState } from "react";

const TasksPage = () => {
  const [filtre, setFiltre] = useState<
    "Tout" | "Attente" | "Progression" | "Terminee"
  >("Tout");

  const [taskState] = useFlow(TaskFlow);

  useEffect(() => {
    console.log(filtre)
  }, [filtre]);

  return (
    <DashbaordLayout>
      {/* Entête */}
      <div className="flex justify-between place-items-center w-full mb-6">
        <h1 className="text-slate-900 font-medium text-2xl">Liste de tache</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setFiltre("Tout")}
            className="border-b-2 border-purple-500"
          >
            Tout
          </button>
          <button onClick={() => setFiltre("Attente")}>Attente</button>
          <button onClick={() => setFiltre("Progression")}>Progression</button>
          <button onClick={() => setFiltre("Terminee")}>Terminée</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {taskState.tasks?.map((task) => (
          <Task
            key={task.id}
            titre={task.titre}
            description={task.description}
            progression={task.progression}
            difficulte={task.difficulte}
            date_debut={task.date_debut}
            date_fin={task.date_fin}
            member={task.member}
          />
        ))}
      </div>
    </DashbaordLayout>
  );
};

export default TasksPage;
