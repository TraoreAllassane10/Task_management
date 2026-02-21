export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface Task {
  id?: string;
  titre: string;
  progression: number;
  difficulte: "Facile" | "Normale" | "Difficile";
  description: string;
  date_debut: string;
  date_fin: string;
  member: {
    image: string;
  }[];
}

interface Membre {
  id: string;
  name: string;
  email: string;
  avatar: string;
}
