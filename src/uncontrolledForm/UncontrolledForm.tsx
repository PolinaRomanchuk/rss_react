import React, { useRef, useState, type ReactElement } from 'react';
import { useStore } from '../store/store';
import { ZodError } from 'zod';
import { formValidation } from '../validation/validation';
import { getbase64 } from '../utils/utils';
import BaseForm from '../baseForm/BaseForm';

type UncontrolledFormProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const UncontrolledForm = ({
  setShowModal,
}: UncontrolledFormProps): ReactElement => {
  const formRef = useRef<HTMLFormElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [passwordValue, setPasswordValue] = useState('');

  const setFormData = useStore((state) => state.addFormData);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const schema = formValidation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (form) {
      const formData = new FormData(form);
      const file = formData.get('file') as File;
      let base64: string | null = null;

      if (file && file.size > 0) {
        base64 = await getbase64(file);
      }
      const data = {
        name: String(formData.get('name')),
        age: Number(formData.get('age')),
        gender: String(formData.get('gender')) as 'male' | 'female',
        country: String(formData.get('country')),
        email: String(formData.get('email')),
        password: String(formData.get('password')),
        confirmedPassword: String(formData.get('confirmedPassword')),
        agreement: formData.get('agreement') !== null,
        file: base64,
      };
      try {
        const validated = schema.parse(data);
        setFormData(validated);
        setShowModal(false);
        console.log(validated);
      } catch (error) {
        if (error instanceof ZodError) {
          setErrors(error.flatten().fieldErrors);
        }
      }
    }
  };

  return (
    <BaseForm
      handleSubmit={handleSubmit}
      values={{
        name: '',
        age: 0,
        email: '',
        password: '',
        confirmedPassword: '',
        gender: 'male',
        agreement: false,
        country: '',
        file: null,
      }}
      errors={errors}
      formref={formRef}
      isControlled={false}
      uncontrolledPass={passwordValue}
      uncontrolledsetPass={setPasswordValue}
      passwordRef={passwordRef}
    />
  );
};

export default UncontrolledForm;
