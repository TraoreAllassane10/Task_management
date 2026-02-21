import { useLocation } from "react-router-dom";
import DashbaordLayout from "../../layout/DashbaordLayout";
import { Plus, Trash, X } from "lucide-react";
import { useState } from "react";
import ModalSousTache from "../../components/tasks/ModalSousTache";
import ModalMemberAssignation from "../../components/tasks/ModalMemberAssignation";
import { members as memberList } from "../../mock/constants";

const CreateTaskPage = () => {
  const location = useLocation();
  const isCreateForm = location.pathname.includes("create");

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAssignation, setIsOpenAssignation] = useState(false);

  const [sousTaches, setSousTaches] = useState<never[] | string[]>([]);
  const [members, setMembers] = useState<string[]>([]);

  const deleteSousTache = (titre: string) => {
    const updateSousTache = sousTaches.filter((tache) => tache !== titre);

    setSousTaches(updateSousTache);
  };

  return (
    <DashbaordLayout>
      <div className="relative max-w-2xl  bg-white border border-gray-200 rounded-lg shadow-sm p-4">
        <div className="flex justify-between place-items-center mb-4">
          <h1 className="text-slate-900 text-xl font-medium">
            {isCreateForm ? "Creation d'une tache" : "Modification d'une tache"}
          </h1>

          {!isCreateForm && (
            <button
              type="button"
              className="w-40 py-1 active:scale-95 transition text-sm text-white rounded-full bg-red-600 hover:bg-red-700"
            >
              <p className="mb-0.5">Supprimer</p>
            </button>
          )}
        </div>

        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-2">Titre</label>
            <input
              type="text"
              placeholder="Titre de la tache"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Description
            </label>
            <textarea
              name=""
              id=""
              className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"
            ></textarea>
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-500 mb-2">
              Difficulté
            </label>
            <select className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors">
              <option>Facile</option>
              <option selected>Normal</option>
              <option>Difficile</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Date debut
              </label>
              <input
                type="date"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Date fin
              </label>
              <input
                type="date"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between place-items-center mb-2">
              <h3 className="text-slate-800 text-xl">Les sous-taches</h3>
              <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="flex border border-gray-200 hover:bg-indigo-300 hover:text-white transition duration-300 px-1 py-0.5 rounded-full"
              >
                <Plus />
              </button>
            </div>

            <ModalSousTache
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setSousTaches={setSousTaches}
            />
            <div className="flex flex-col gap-2">
              {sousTaches.length === 0 ? (
                <p className=" italic text-gray-400 text-sm">
                  Aucune sous-tache ajouter
                </p>
              ) : (
                sousTaches.map((tache, index) => (
                  <div
                    key={index}
                    className="flex justify-between place-items-center bg-gray-100 px-2 py-1 rounded-md"
                  >
                    <p className="text-sm">{tache}</p>
                    <button
                      type="button"
                      onClick={() => deleteSousTache(tache)}
                    >
                      <Trash
                        size={24}
                        className="border border-gray-300 rounded-md p-1 hover:bg-red-400 hover:text-white transition duration-300"
                      />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between place-items-center mb-2">
              <h3 className="text-slate-800 text-xl">Assignation</h3>
              <button
                onClick={() => setIsOpenAssignation(true)}
                type="button"
                className="flex border border-gray-200 hover:bg-indigo-300 hover:text-white transition duration-300 px-1 py-0.5 rounded-full"
              >
                <Plus />
              </button>
            </div>

            <ModalMemberAssignation
              isOpenAssignation={isOpenAssignation}
              setIsOpenAssignation={setIsOpenAssignation}
              membersArray={members}
              setMembers={setMembers}
            />
            <div className="flex flex-wrap  gap-2">
              {members.length === 0 ? (
                <p className=" italic text-gray-400 text-sm">
                  Aucune assignation
                </p>
              ) : (
                members.map((member, index) => (
                  <img
                  key={index}
                    className="h-10 w-10 rounded-full"
                    src={
                      memberList?.find((item) => item.id === String(member))
                        ?.avatar
                    }
                    alt={
                      memberList?.find((item) => item.id === String(member))
                        ?.name
                    }
                  />
                ))
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-linear-to-br from-indigo-500 to-purple-600 text-white rounded-lg text-sm cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(99,102,241,0.3)]"
          >
           {isCreateForm ? "Ajouter nouvelle tache" : "Modifier cette tache"}
          </button>
        </form>
      </div>
    </DashbaordLayout>
  );
};

export default CreateTaskPage;
