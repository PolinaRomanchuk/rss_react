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
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kuwait',
  ],
  formDataList: [],
  addFormData: (data) =>
    set((state) => ({
      formDataList: [...state.formDataList, data],
    })),
  resetFormData: () => set({ formDataList: [] }),
}));
