import { Timestamp } from "firebase/firestore";
export interface ICat {
  creator: string;
  id: string;
  ownerName: string;
  name: string;
  dewormed: boolean;
  gender: string;
  vaccinated: boolean;
  dateOfVaccine?: Timestamp;
  dateOfDeworm?: Timestamp;
  dateOfsterilization?: Timestamp;
  sterilized: boolean;
  birthdate: Timestamp;
}

export interface CatReportData {
  name: string;
  dewormed: string;
  gender: string;
  vaccinated: string;
  birthdate: string;
}

interface catList {
  cats: ICat[];
  setCats: React.Dispatch<React.SetStateAction>;
}
interface ICatComp {
  selectedCat: ICat;
  setEditMode: React.Dispatch<React.SetStateAction>;
  setSelectedCat: React.Dispatch<React.SetStateAction>;
}

interface IAddEditCat {
  editMode: boolean;
  cat?: ICat;
  setEditMode?: React.Dispatch<React.SetStateAction>;
  setSelectedCat?: React.Dispatch<React.SetStateAction>;
}
interface IDeleteModal {
  id: string;
  closeModal: function;
}
