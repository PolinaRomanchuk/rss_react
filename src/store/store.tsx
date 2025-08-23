import { create } from 'zustand';

type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmedPassword: string;
  gender: 'male' | 'female';
  agreement: boolean;
  country: string;
  file: string | null;
};

type Store = {
  countries: string[];
  formDataList: FormData[];
  addFormData: (data: FormData) => void;
  resetFormData: () => void;
};

export const useStore = create<Store>()((set) => ({
  countries: ['Belarus', 'Russia', 'USA'],
  formDataList: [],
  addFormData: (data) =>
    set((state) => ({
      formDataList: [...state.formDataList, data],
    })),
  resetFormData: () => set({ formDataList: [] }),
}));
