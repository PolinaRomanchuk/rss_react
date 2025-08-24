export type FormField =
  | 'name'
  | 'age'
  | 'gender'
  | 'country'
  | 'email'
  | 'password'
  | 'confirmedPassword'
  | 'agreement'
  | 'file';

export type FormData = {
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
