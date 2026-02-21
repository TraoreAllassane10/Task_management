import DashbaordLayout from "../../layout/DashbaordLayout";
import { members } from "../../mock/constants";

const TeamPage = () => {
  return (
    <DashbaordLayout>
      <h1 className="text-slate-900 font-semibold text-2xl mb-6">
        Membres de l'equipe
      </h1>

      <div className="grid grid-cols-3 gap-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-white p-2 rounded-md flex gap-2 place-items-center"
          >
            <img
              src={member.avatar}
              alt={member.name}
              className="w-10 h-10 rounded-full"
            />

            <div>
              <p className="text-slate-900 font-medium">{member.name}</p>
              <p className="text-gray-500">{member.email}</p>
            </div>
          </div>
        ))}
      </div>
    </DashbaordLayout>
  );
};

export default TeamPage;
