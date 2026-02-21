import  { useEffect, useState } from 'react'
import DashbaordLayout from '../../layout/DashbaordLayout';
import { useFlow } from 'fractostate';
import { TaskFlow } from '../../flows/taskFlow';
import TaskCard from '../../components/tasks/Task';

const TasksMemberPage = () => {
const [filtre, setFiltre] = useState<
    "" | "Attente" | "Progression" | "Terminee"
  >("");

  const [taskState] = useFlow(TaskFlow);

  useEffect(() => {
    console.log(filtre)
  }, [filtre]);

  return (
    <DashbaordLayout>
      {/* Entête */}
      <div className="flex justify-between place-items-center w-full mb-6">
        <h1 className="text-slate-900 font-medium text-2xl">Mes taches</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setFiltre("")}
            className="border-b-2 border-purple-500"
          >
            Tout
          </button>
          <button onClick={() => setFiltre("Attente")}>Attente</button>
          <button onClick={() => setFiltre("Progression")}>Progression</button>
          <button onClick={() => setFiltre("Terminee")}>Terminée</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {taskState.tasks?.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
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
}

export default TasksMemberPage