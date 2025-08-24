import { getPasswordStrength } from './utils';

describe('getPasswordStrength', () => {
  it('returns weak for empty password', () => {
    expect(getPasswordStrength('')).toEqual({
      score: 0,
      label: 'weak',
      color: 'red',
    });
  });

  it('calculates score and label', () => {
    expect(getPasswordStrength('abc')).toEqual({
      score: 1,
      label: 'weak',
      color: 'red',
    });

    expect(getPasswordStrength('abc123')).toEqual({
      score: 3,
      label: 'medium',
      color: 'orange',
    });

    expect(getPasswordStrength('Abc123!')).toEqual({
      score: 5,
      label: 'strong',
      color: 'green',
    });
  });

  it('assigns color by score', () => {
    expect(getPasswordStrength('123')).toEqual({
      score: 1,
      label: 'weak',
      color: 'red',
    });

    expect(getPasswordStrength('abc123')).toEqual({
      score: 3,
      label: 'medium',
      color: 'orange',
    });

    expect(getPasswordStrength('Abc123!')).toEqual({
      score: 5,
      label: 'strong',
      color: 'green',
    });
  });
});
