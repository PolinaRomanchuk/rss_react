import { type ReactElement, type Ref } from 'react';
import AutocompletedCountry from '../utils/AutocompletedCountry';
import PasswordStrength from '../utils/PasswordStrength';
import type { FormField } from '../type/form';
import { type FormData } from '../type/form';
import { getbase64 } from '../utils/utils';
import './baseform.css';

type BaseFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  values: FormData;
  formref?: Ref<HTMLFormElement>;
  onChange?: <F extends FormField>(field: F, value: FormData[F]) => void;
  errors: Record<string, string[]>;
  isValid?: boolean;
  isControlled?: boolean;
  uncontrolledPass?: string;
  uncontrolledsetPass?: React.Dispatch<React.SetStateAction<string>>;
  passwordRef?: Ref<HTMLInputElement>;
};

const BaseForm = ({
  handleSubmit,
  values,
  onChange,
  errors,
  isValid,
  isControlled = true,
  formref,
  uncontrolledPass,
  uncontrolledsetPass,
  passwordRef,
}: BaseFormProps): ReactElement => {
  const handleChangeFile = async (rowfile: File) => {
    if (!isControlled || !onChange) return;

    const file = rowfile ?? null;
    if (file) {
      const base64 = await getbase64(file);
      onChange('file', base64);
    } else {
      onChange('file', null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={isControlled ? undefined : formref}
      className="form"
    >
      <div className="form_input-container">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={isControlled ? values.name : undefined}
          defaultValue={isControlled ? undefined : values.name}
          onChange={(e) =>
            isControlled && onChange && onChange('name', e.target.value)
          }
        />
        <div className="error_container">
          {errors.name && <p className="error">{errors.name[0]}</p>}
        </div>
      </div>
      <div className="form_input-container">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={isControlled ? values.age : undefined}
          defaultValue={isControlled ? undefined : values.age}
          onChange={(e) =>
            isControlled && onChange && onChange('age', Number(e.target.value))
          }
        />
        <div className="error_container">
          {errors.age && <p className="error">{errors.age[0]}</p>}
        </div>
      </div>

      <fieldset className="form_fieldset-container">
        <legend>Gender</legend>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={isControlled ? values.gender === 'male' : undefined}
            defaultChecked={!isControlled && values.gender === 'male'}
            onChange={() =>
              isControlled && onChange && onChange('gender', 'male')
            }
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={isControlled ? values.gender === 'female' : undefined}
            defaultChecked={!isControlled && values.gender === 'female'}
            onChange={() =>
              isControlled && onChange && onChange('gender', 'female')
            }
          />{' '}
          Female
        </label>
      </fieldset>

      <div className="form_input-container">
        {isControlled ? (
          <AutocompletedCountry
            country={values.country}
            setCountry={(val) => onChange && onChange('country', val)}
            validateField={() => {}}
          />
        ) : (
          <AutocompletedCountry defaultValue={values.country} />
        )}
        <div className="error_container">
          {errors.country && <p className="error">{errors.country[0]}</p>}
        </div>
      </div>

      <div className="form_input-container">
        <label htmlFor="email">Email</label>
        <input
          type="string"
          id="email"
          name="email"
          value={isControlled ? values.email : undefined}
          defaultValue={!isControlled ? values.email : undefined}
          onChange={(e) =>
            isControlled && onChange && onChange('email', e.target.value)
          }
        />
        <div className="error_container">
          {errors.email && <p className="error">{errors.email[0]}</p>}
        </div>
      </div>

      <div className="form_input-container">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={isControlled ? values.password : undefined}
          defaultValue={!isControlled ? values.password : undefined}
          onChange={(e) =>
            isControlled && onChange && onChange('password', e.target.value)
          }
          ref={passwordRef && passwordRef}
          onInput={() => {
            if (
              passwordRef &&
              'current' in passwordRef &&
              passwordRef.current
            ) {
              if (uncontrolledsetPass) {
                uncontrolledsetPass(passwordRef.current.value);
              }
            }
          }}
        />
        <PasswordStrength
          password={uncontrolledPass ? uncontrolledPass : values.password}
        />
        <div className="error_container">
          {errors.password && <p className="error">{errors.password[0]}</p>}
        </div>
      </div>

      <div className="form_input-container">
        <label htmlFor="confirmedPassword">Confirm password</label>
        <input
          type="password"
          id="confirmedPassword"
          name="confirmedPassword"
          value={isControlled ? values.confirmedPassword : undefined}
          defaultValue={!isControlled ? values.confirmedPassword : undefined}
          onChange={(e) =>
            isControlled &&
            onChange &&
            onChange('confirmedPassword', e.target.value)
          }
        />
        <div className="error_container">
          {errors.confirmedPassword && (
            <p className="error">{errors.confirmedPassword[0]}</p>
          )}
        </div>
      </div>

      <label>
        <input
          type="checkbox"
          id="agreement"
          name="agreement"
          checked={isControlled ? values.agreement : undefined}
          defaultChecked={!isControlled && values.agreement}
          onChange={(e) =>
            isControlled && onChange && onChange('agreement', e.target.checked)
          }
        />
        I agree to Terms and Conditions
      </label>
      <div className="error_container">
        {errors.agreement && <p className="error">{errors.agreement[0]}</p>}
      </div>

      <div className="form_input-container">
        <input
          type="file"
          id="file"
          name="file"
          accept=".jpeg,.png"
          onChange={async (e) => {
            if (e.target.files?.[0]) {
              handleChangeFile(e.target.files?.[0]);
            }
          }}
          className="hidden"
        />
        <div className="file_container">
          <label htmlFor="file" className="upload-btn">
            Upload image
          </label>
          {values.file && <p className="file-name">file is uploaded</p>}
        </div>
        <div className="error_container">
          {errors.file && <p className="error">{errors.file[0]}</p>}
        </div>
      </div>

      <button type="submit" disabled={isControlled && !isValid}>
        Done
      </button>
    </form>
  );
};

export default BaseForm;
