import type { ReactElement } from 'react';
import { getPasswordStrength } from './utils';
import './password.css';

type PasswordStrengthProps = {
  password: string;
};

const PasswordStrength = ({
  password,
}: PasswordStrengthProps): ReactElement => {
  const { score, color, label } = getPasswordStrength(password);

  return (
    <div className="password-strength_container">
      <div className="password-strength_cell-container" data-testid="cells">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index + 1}
            className="password-strength_cell"
            style={{
              backgroundColor: index < score ? color : 'lightgray',
            }}
            data-testid="cell"
          />
        ))}
      </div>
      {password && <p>{label} password</p>}
    </div>
  );
};
export default PasswordStrength;
