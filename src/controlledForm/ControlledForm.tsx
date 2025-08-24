import { useEffect, useState, type ReactElement } from 'react';
import { useStore } from '../store/store';
import { ZodError } from 'zod';
import { formValidation } from '../validation/validation';
import type { FormField } from '../type/form';
import { type FormData } from '../type/form';
import BaseForm from '../baseForm/BaseForm';

type ControlledFormProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ControlledForm = ({
  setShowModal,
}: ControlledFormProps): ReactElement => {
  const setFormData = useStore((state) => state.addFormData);

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isValid, setIsValid] = useState(false);

  const [values, setValues] = useState<FormData>({
    name: '',
    age: 0,
    gender: 'male',
    country: '',
    email: '',
    password: '',
    confirmedPassword: '',
    agreement: false,
    file: null,
  });
  const schema = formValidation();

  const handleChange = <F extends FormField>(field: F, value: FormData[F]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSubmit = { ...values };

    try {
      const validated = schema.parse(dataToSubmit);
      setFormData(validated);
      setShowModal(false);
      console.log(validated);
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(error.flatten().fieldErrors);
      }
    }
  };

  const validateField = (field: FormField, value: unknown) => {
    let newErrors = { ...errors };
    if (field === 'confirmedPassword') {
      if (value !== values.password) {
        newErrors.confirmedPassword = ['Passwords must match'];
      } else {
        delete newErrors.confirmedPassword;
      }
    }
    const fieldSchema = schema.shape[field];
    const result = fieldSchema.safeParse(value);

    if (!result.success) {
      newErrors[field] = result.error.issues.map((issue) => issue.message);
    } else if (field !== 'confirmedPassword') {
      newErrors = Object.fromEntries(
        Object.entries(newErrors).filter(([key]) => key !== field)
      );
    }
    setErrors(newErrors);
  };

  useEffect(() => {
    const valid =
      values.name !== '' &&
      values.age > 0 &&
      values.email !== '' &&
      values.password !== '' &&
      values.confirmedPassword !== '' &&
      values.country !== '' &&
      values.agreement &&
      values.file !== null;
    setIsValid(Object.keys(errors).length === 0 && valid);
  }, [
    errors,
    values.age,
    values.agreement,
    values.confirmedPassword,
    values.country,
    values.email,
    values.file,
    values.name,
    values.password,
  ]);

  return (
    <BaseForm
      handleSubmit={handleSubmit}
      values={values}
      onChange={handleChange}
      errors={errors}
      isValid={isValid}
      isControlled={true}
    />
  );
};

export default ControlledForm;
