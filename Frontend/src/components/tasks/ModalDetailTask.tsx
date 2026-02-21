import { X } from "lucide-react";
import { tasks } from "../../mock/constants";
import ProgressBar from "../ProgressBar";
import { FormatDifficulty, FormatStatus } from "./Task";

const ModalDetailTask = ({ taskId, isOpenDetail, setIsOpenDetail }: any) => {
  const task = tasks.find((item) => item.id === taskId);

  const sousTaches = [
    "Sous-tache 1",
    "Sous-tache 2",
    "Sous-tache 3",
    "Sous-tache 4",
  ];

  return (
    <div>
      {/* Overlay */}
      {isOpenDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background noir */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpenDetail(false)}
          />

          {/* Modal */}
          <div
            className={`
              relative bg-white w-full max-w-lg mx-4 rounded-xl shadow-xl
              transform transition-all duration-200
              ${isOpenDetail ? "scale-100 opacity-100" : "scale-95 opacity-0"}
            `}
          >
            {/* Header */}
            <div className="flex justify-between items-center py-3 px-4 border-b border-gray-300">
              <h3 className="font-semibold text-gray-800">
                Detail d'une tache
              </h3>

              <button
                onClick={() => setIsOpenDetail(false)}
                className="size-8 flex items-center justify-center rounded-full bg-red-400 hover:bg-red-500 text-white transition duration-300"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-2">
              <div className="flex gap-1">
                <div>{FormatStatus(task?.progression || 0)}</div>
                <div>{FormatDifficulty(task?.difficulte || "Normal")}</div>
              </div>

              <h1 className="text-slate-900 font-medium text-xl">
                {task?.titre}
              </h1>
              <p className="text-gray-600 text-sm">{task?.description}</p>

              <ProgressBar value={task?.progression} />

              <div>
                <p className="text-gray-700">
                  Date debut :{" "}
                  <span className="text-slate-900 font-medium">
                    {task?.date_debut}
                  </span>
                </p>
                <p>
                  Date fin :{" "}
                  <span className="text-slate-900 font-medium">
                    {task?.date_fin}
                  </span>
                </p>
              </div>

              <div>
                <h3 className="text-slate-800 font-medium">
                  Utilisateurs assignés à cette tache
                </h3>
                <div className="flex flex-wrap gap-2">
                  {task?.member.map((member, index) => (
                    <img
                      key={index}
                      className="h-10 w-10 rounded-full"
                      src={member.image}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-slate-800 font-medium">
                  Liste des sous-taches
                </h3>
                <div className="space-y-1">
                  {sousTaches.map((tache, index) => (
                    <div
                      key={index}
                      className="flex gap-2 place-items-center "
                    >
                      <input type="checkbox" className="border border-gray-400 w-4 h-4" />
                      <p className="text-md text-slate-700">{tache}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 py-3 px-4 border-t border-gray-300">
              <button
                onClick={() => setIsOpenDetail(false)}
                className="py-2 px-3 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                Fermer
              </button>

              <button
                type="button"
                //   onClick={handleAddSousTache}
                className="py-2 px-3 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Mise à jour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalDetailTask;
