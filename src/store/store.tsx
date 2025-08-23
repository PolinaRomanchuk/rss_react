import { create } from 'zustand';
import { type FormData } from '../type/form';

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
