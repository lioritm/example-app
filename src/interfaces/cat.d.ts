export interface ICat {
  id: string;
  ownerName: string;
  name: string;
  dewormed: boolean;
  gender: string;
  vaccinated: boolean;
  dateOfVaccine?: {
    nanoseconds: number;
    seconds: number;
  };
  dateOfDeworm?: {
    nanoseconds: number;
    seconds: number;
  };
  dateOfsterilization?: {
    nanoseconds: number;
    seconds: number;
  };
  sterilized: boolean;
  birthdate: {
    nanoseconds: number;
    seconds: number;
  };
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
  setSelectedCat: React.Dispatch<React.SetStateAction>;
}

interface IAddEditCat {
  editMode: boolean;
  cat?: ICat;
  setEditMode?: React.Dispatch<React.SetStateAction>;
  setSelectedCat?: React.Dispatch<React.SetStateAction>;
}
