import { create } from 'zustand';
import { type FormData } from '../type/form';

type Store = {
  countries: string[];
  formDataList: FormData[];
  addFormData: (data: FormData) => void;
  resetFormData: () => void;
};

export const useStore = create<Store>()((set) => ({
  countries: [
    'Belarus',
    'Russia',
    'USA',
    'Poland',
    'Germany',
    'Canada',
    'France',
    'Italy',
    'Spain',
    'Japan',
  ],
  formDataList: [],
  addFormData: (data) =>
    set((state) => ({
      formDataList: [...state.formDataList, data],
    })),
  resetFormData: () => set({ formDataList: [] }),
}));
