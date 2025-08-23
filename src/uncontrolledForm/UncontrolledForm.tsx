import { useRef, type ReactElement } from 'react';
import './uncontrolled.css';
import { useStore } from '../store/store';

const UncontrolledForm = (): ReactElement => {
  const formRef = useRef<HTMLFormElement>(null);
  const setFormData = useStore((state) => state.setFormData);
  const countries = useStore((state) => state.countries);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (form) {
      const formData = new FormData(form);
      const file = formData.get('file') as File;
      const base64 = await getbase64(file);

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
      setFormData(data);
      console.log(data);
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
      </div>
      <div className="uncontrolled-form_input-container">
        <label htmlFor="age">Age</label>
        <input type="text" id="age" name="age" defaultValue="" />
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
      </div>

      <div className="uncontrolled-form_input-container">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" defaultValue="" />
      </div>

      <div className="uncontrolled-form_input-container">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" defaultValue="" />
      </div>

      <div className="uncontrolled-form_input-container">
        <label htmlFor="password">Confirm password</label>
        <input
          type="password"
          id="confirmedPassword"
          name="confirmedPassword"
          defaultValue=""
        />
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

      <div className="uncontrolled-form_input-container">
        <label htmlFor="file">Upload image</label>
        <input type="file" id="file" name="file" accept=".jpeg,.png" />
      </div>

      <button type="submit">Done</button>
    </form>
  );
};

export default UncontrolledForm;
