import { useState, type ReactElement } from 'react';
import { useStore } from '../store/store';
import { ZodError } from 'zod';
import { formValidation } from '../validation/validation';
import { getbase64 } from '../utils/utils';
import type { FormField } from '../type/form';

type ControlledFormProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ControlledForm = ({
  setShowModal,
}: ControlledFormProps): ReactElement => {
  const setFormData = useStore((state) => state.addFormData);
  const countries = useStore((state) => state.countries);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isValid, setIsValid] = useState(false);

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let base64: string | null = null;

    if (file && file.size > 0) {
      base64 = await getbase64(file);
    }
    const data = {
      name,
      age: Number(age),
      gender,
      country,
      email,
      password,
      confirmedPassword,
      agreement,
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
  };

  const validateField = (field: FormField, value: unknown) => {
    const fieldSchema = formValidation.shape[field];
    const result = fieldSchema.safeParse(value);

    let newErrors = { ...errors };

    if (!result.success) {
      newErrors[field] = result.error.issues.map((issue) => issue.message);
    } else {
      const { [field]: _, ...rest } = errors;
      newErrors = rest;
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form_input-container">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue=""
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            validateField('name', e.target.value);
          }}
        />
        {errors.name && <p className="error">{errors.name[0]}</p>}
      </div>
      <div className="form_input-container">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          defaultValue=""
          value={age}
          onChange={(e) => {
            setAge(Number(e.target.value));
            validateField('age', Number(e.target.value));
          }}
        />
        {errors.age && <p className="error">{errors.age[0]}</p>}
      </div>

      <fieldset className="form_fieldset-container">
        <legend>Gender</legend>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            defaultChecked
            onChange={() => setGender('male')}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={() => setGender('female')}
          />
          Female
        </label>
      </fieldset>

      <div className="form_input-container">
        <label htmlFor="country">Country</label>
        <select
          id="country"
          name="country"
          defaultValue=""
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            validateField('country', e.target.value);
          }}
        >
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

      <div className="form_input-container">
        <label htmlFor="email">Email</label>
        <input
          type="string"
          id="email"
          name="email"
          defaultValue=""
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateField('email', e.target.value);
          }}
        />
        {errors.email && <p className="error">{errors.email[0]}</p>}
      </div>

      <div className="form_input-container">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          defaultValue=""
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validateField('password', e.target.value);
          }}
        />
        {errors.password && <p className="error">{errors.password[0]}</p>}
      </div>

      <div className="form_input-container">
        <label htmlFor="confirmedPassword">Confirm password</label>
        <input
          type="password"
          id="confirmedPassword"
          name="confirmedPassword"
          defaultValue=""
          value={confirmedPassword}
          onChange={(e) => {
            setConfirmedPassword(e.target.value);
            validateField('confirmedPassword', e.target.value);
          }}
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
          checked={agreement}
          onChange={(e) => {
            setAgreement(e.target.checked);
            validateField('agreement', e.target.checked);
          }}
        />
        I agree to terms and Conditions
      </label>
      {errors.agreement && <p className="error">{errors.agreement[0]}</p>}

      <div className="form_input-container">
        <label htmlFor="file">Upload image</label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".jpeg,.png"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <button type="submit" disabled={!isValid}>
        Done
      </button>
    </form>
  );
};

export default ControlledForm;
