import { ICat } from "./cat";

export interface ContextProps {
  children: ReactNode;
}

export interface AuthContextInterface {
  user: User | null;
  logout: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
}

export interface CatsContextInterface {
  setSearch: (search: string) => void;
  searchResults: ICat[];
  search: string;
  returnCat: (id: string) => ICat | undefined;
  addNewCat: (newCat: ICat) => Promise<void>;
  updateCat: (cat: ICat, changes: object) => Promise<void>;
  getCats: () => Promise<void>;
}
