import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"]; 

export default function DifficultyBarChart({ data }: any) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-87.5 bg-white p-6 rounded-2xl shadow-sm flex items-center justify-center text-gray-400">
        Aucune donnée disponible
      </div>
    );
  }

  return (
    <div className="w-full h-87.5 bg-white p-8 rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">
        Répartition par difficulté
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]} // coins arrondis
          >
            {data.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
