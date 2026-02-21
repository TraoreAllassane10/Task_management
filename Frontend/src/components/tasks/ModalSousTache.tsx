import { X } from "lucide-react";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  setSousTaches: React.Dispatch<React.SetStateAction<never[] | string[]>>;
}

const ModalSousTache = ({ isOpen, setIsOpen, setSousTaches }: ModalProps) => {
  const [titre, setTitre] = useState("");

  const handleAddSousTache = () => {
    setSousTaches((prev) => [...prev, titre]);
    setTitre('');
    setIsOpen(false);
  };
  return (
    <div>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background noir */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div
            className={`
              relative bg-white w-full max-w-lg mx-4 rounded-xl shadow-xl
              transform transition-all duration-200
              ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
            `}
          >
            {/* Header */}
            <div className="flex justify-between items-center py-3 px-4 border-b border-gray-300">
              <h3 className="font-semibold text-gray-800">
                Ajouter une sous-tache
              </h3>

              <button
                onClick={() => setIsOpen(false)}
                className="size-8 flex items-center justify-center rounded-full bg-red-400 hover:bg-red-500 text-white transition duration-300"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-4">
              <div>
                <input
                  type="text"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  placeholder="Titre de la sous tache"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 py-3 px-4 border-t border-gray-300">
              <button
                onClick={() => setIsOpen(false)}
                className="py-2 px-3 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                Fermer
              </button>

              {titre && (
                <button
                  type="button"
                  onClick={handleAddSousTache}
                  className="py-2 px-3 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Ajouter
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalSousTache;
