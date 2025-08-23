export const getbase64 = async (file: File): Promise<string> => {
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const getPasswordStrength = (
  password: string
): { score: number; label: string; color: string } => {
  let score = 0;

  if (password.length >= 6) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  let label = 'weak';
  let color = 'red';

  if (score <= 2) {
    label = 'weak';
    color = 'red';
  } else if (score === 3 || score === 4) {
    label = 'medium';
    color = 'orange';
  } else if (score === 5) {
    label = 'strong';
    color = 'green';
  }

  return { score, label, color };
};
