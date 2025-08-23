import React, { useRef, useState, type ReactElement } from 'react';
import './uncontrolled.css';
import { useStore } from '../store/store';
import { ZodError } from 'zod';
import { formValidation } from '../validation/validation';

type UncontrolledFormProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const UncontrolledForm = ({
  setShowModal,
}: UncontrolledFormProps): ReactElement => {
  const formRef = useRef<HTMLFormElement>(null);
  const setFormData = useStore((state) => state.addFormData);
  const countries = useStore((state) => state.countries);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

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
        const validated = formValidation.parse(data);
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

  const getbase64 = async (file: File): Promise<string> => {
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="uncontrolled-form">
      <div className="uncontrolled-form_input-container">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" defaultValue="" />
        {errors.name && <p className="error">{errors.name[0]}</p>}
      </div>
      <div className="uncontrolled-form_input-container">
        <label htmlFor="age">Age</label>
        <input type="text" id="age" name="age" defaultValue="" />
        {errors.age && <p className="error">{errors.age[0]}</p>}
      </div>

      <fieldset className="uncontrolled-form_fieldset-container">
        <legend>Gender</legend>
        <label>
          <input type="radio" name="gender" value="male" defaultChecked />
          Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" />
          Female
        </label>
        {errors.gender && <p className="error">{errors.gender[0]}</p>}
      </fieldset>

      <div className="uncontrolled-form_input-container">
        <label htmlFor="country">Country</label>
        <select id="country" name="country" defaultValue="">
          <option value="" disabled>
            Select a country
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && <p className="error">{errors.country[0]}</p>}
      </div>

      <div className="uncontrolled-form_input-container">
        <label htmlFor="email">Email</label>
        <input type="string" id="email" name="email" defaultValue="" />
        {errors.email && <p className="error">{errors.email[0]}</p>}
      </div>

      <div className="uncontrolled-form_input-container">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" defaultValue="" />
        {errors.password && <p className="error">{errors.password[0]}</p>}
      </div>

      <div className="uncontrolled-form_input-container">
        <label htmlFor="confirmedPassword">Confirm password</label>
        <input
          type="password"
          id="confirmedPassword"
          name="confirmedPassword"
          defaultValue=""
        />
        {errors.confirmedPassword && (
          <p className="error">{errors.confirmedPassword[0]}</p>
        )}
      </div>

      <label>
        <input
          type="checkbox"
          id="agreement"
          name="agreement"
          defaultChecked={false}
        />
        I agree to terms and Conditions
      </label>
      {errors.agreement && <p className="error">{errors.agreement[0]}</p>}

      <div className="uncontrolled-form_input-container">
        <label htmlFor="file">Upload image</label>
        <input type="file" id="file" name="file" accept=".jpeg,.png" />
        {errors.file && <p className="error">{errors.file[0]}</p>}
      </div>

      <button type="submit">Done</button>
    </form>
  );
};

export default UncontrolledForm;
