import { X } from "lucide-react";
import { members } from "../../mock/constants";

interface ModalProps {
  isOpenAssignation: boolean;
  setIsOpenAssignation: (value: React.SetStateAction<boolean>) => void;
  membersArray: string[];
  setMembers: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

const ModalMemberAssignation = ({
  isOpenAssignation,
  setIsOpenAssignation,
  membersArray,
  setMembers,
}: ModalProps) => {
  const addMember = (id: string) => {
    setMembers((prev) => {
      if (prev?.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...(prev ?? ""), id];
      }
    });
  };
  return (
    <div>
      {/* Overlay */}
      {isOpenAssignation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background noir */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpenAssignation(false)}
          />

          {/* Modal */}
          <div
            className={`
              relative bg-white w-full max-w-lg mx-4 rounded-xl shadow-xl
              transform transition-all duration-200 flex flex-col max-h-[90vh]
              ${isOpenAssignation ? "scale-100 opacity-100" : "scale-95 opacity-0"}
            `}
          >
            {/* Header */}
            <div className="flex justify-between items-center py-3 px-4 border-b border-gray-300 flex-shrink-0">
              <h3 className="font-semibold text-gray-800">
                Assigner la tache aux membres de l'equipe
              </h3>

              <button
                onClick={() => setIsOpenAssignation(false)}
                className="size-8 flex items-center justify-center rounded-full bg-red-400 hover:bg-red-500 text-white transition duration-300"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 overflow-y-auto flex-1">
              <div className="space-y-2">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex justify-between place-items-center bg-gray-50 px-2 py-1 rounded-md"
                  >
                    <div className="flex gap-4 place-items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={member.avatar}
                        alt={member.name}
                      />

                      <div className="flex flex-col ">
                        <p>{member.name}</p>
                        <p>{member.email}</p>
                      </div>
                    </div>

                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      onChange={() => addMember(member.id)}
                      checked={membersArray?.includes(member.id) ? true : false}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 py-3 px-4 border-t border-gray-300 shrink-0">
              <button
                onClick={() => setIsOpenAssignation(false)}
                className="py-2 px-3 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                Fermer
              </button>

              <button
                type="button"
                  onClick={() => setIsOpenAssignation(false)}
                className="py-2 px-3 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Terminer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalMemberAssignation;
