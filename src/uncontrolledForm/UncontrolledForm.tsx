import { useRef, type ReactElement } from 'react';
import './uncontrolled.css';

const UncontrolledForm = (): ReactElement => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (form) {
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        age: Number(formData.get('age')),
        gender: formData.get('gender'),
        country: formData.get('country'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmedPassword: formData.get('confirmedPassword'),
        agreement: formData.get('agreement'),
        file: formData.get('file'),
      };
      console.log(data);
    }
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
          <option value="belarus">Belarus</option>
          <option value="russia">Russia</option>
          <option value="usa">USA</option>
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
        <input type="file" id="file" name="file" accept=".jpg,.png,.svg" />
      </div>

      <button type="submit">Done</button>
    </form>
  );
};

export default UncontrolledForm;
