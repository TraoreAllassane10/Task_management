import type { Task } from "../../types";
import ProgressBar from "../ProgressBar";

const Task = ({
  titre,
  description,
  progression,
  difficulte,
  date_debut,
  date_fin,
  member,
}: Task) => {
  return (
    <div className="bg-white p-3 flex flex-col gap-2 rounded-sm">
      <div className="flex gap-1">
        <div>{FormatStatus(progression)}</div>
        <div>{FormatDifficulty(difficulte)}</div>
      </div>
      <div className="flex flex-col gap-1 bg-purple-50 border-l-4 border-purple-500 px-2">
        <h3 className="text-slate-800 text-lg font-medium">{titre}</h3>
        <p className="line-clamp-2 overflow-hidden text-gray-700">
          {description}
        </p>
      </div>
      <ProgressBar value={progression} />
      <p>
        Tache effectuée <span className="text-blue-500 font-medium">5/5</span>
      </p>
      <div className="flex justify-between">
        <span>{date_debut}</span>
        <span>{date_fin}</span>
      </div>
      <div>
        <div className="flex -space-x-2">
          {member.map((mb) => (
            <img
              className="inline-block size-8 rounded-full ring-2 ring-layer"
              src={mb.image}
              alt="Avatar"
            />
          ))}

          <div className="hs-dropdown [--placement:top-left] relative inline-flex">
            <button
              id="hs-avatar-group-dropdown"
              className="hs-dropdown-toggle inline-flex items-center justify-center size-8 rounded-full bg-layer border border-layer-line border-gray-500 text-layer-foreground font-medium text-sm shadow-2xs hover:bg-layer-hover focus:outline-hidden focus:bg-layer-focus"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              <span className="font-medium">4+</span>
            </button>

            <div
              className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-48 hidden z-10 transition-[margin,opacity] opacity-0 duration-300 bg-dropdown border border-dropdown-line shadow-md rounded-lg p-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="hs-avatar-group-dropdown"
            >
              <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-dropdown-item-foreground hover:bg-dropdown-item-hover focus:outline-hidden focus:bg-dropdown-item-focus"
                href="#"
              >
                Chris Lynch
              </a>
              <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-dropdown-item-foreground hover:bg-dropdown-item-hover focus:outline-hidden focus:bg-dropdown-item-focus"
                href="#"
              >
                Maria Guan
              </a>
              <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-dropdown-item-foreground hover:bg-dropdown-item-hover focus:outline-hidden focus:bg-dropdown-item-focus"
                href="#"
              >
                Amil Evara
              </a>
              <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-dropdown-item-foreground hover:bg-dropdown-item-hover focus:outline-hidden focus:bg-dropdown-item-focus"
                href="#"
              >
                Ebele Egbuna
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormatDifficulty = (difficulte: string) => {
  if (difficulte === "Facile") {
    return <div className="bg-purple-100 text-purple-500 p-1 ">Facile</div>;
  } else if (difficulte === "Difficile") {
    return <div className="bg-red-100 text-red-500 p-1">Difficile</div>;
  } else {
    return <div className="bg-indigo-100 text-indigo-500 p-1">Normale</div>;
  }
};

const FormatStatus = (progression: number) => {
  if (progression === 0) {
    return <div className="bg-blue-100 text-blue-500 p-1">Attente</div>;
  } else if (progression === 100) {
    return <div className="bg-green-100 text-green-500 p-1">Terminée</div>;
  } else {
    return <div className="bg-yellow-100 text-yellow-500 p-1">Progression</div>;
  }
};

export default Task;
