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
  formData: FormData | null;
  setFormData: (data: FormData) => void;
  resetFormData: () => void;
};

export const useStore = create<Store>()((set) => ({
  countries: ['Belarus', 'Russia', 'USA'],
  formData: null,
  setFormData: (data) => set({ formData: data }),
  resetFormData: () =>
    set({
      formData: {
        name: '',
        age: 0,
        email: '',
        password: '',
        confirmedPassword: '',
        gender: 'male',
        agreement: false,
        country: '',
        file: null,
      },
    }),
}));
