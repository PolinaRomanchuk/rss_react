import { useStore } from './store';
import { type FormData } from '../type/form';

describe('useStore', () => {
  beforeEach(() => {
    useStore.getState().resetFormData();
  });

  it('should have initial state', () => {
    const state = useStore.getState();
    expect(state.countries.length).toBeGreaterThan(0);
    expect(state.formDataList).toEqual([]);
  });

  it('should add form data', () => {
    const testData: FormData = {
      name: 'Polina',
      age: 26,
      email: 'polina@example.com',
      gender: 'female',
      country: 'Belarus',
      file: 'file.jpg',
      password: '1234',
      confirmedPassword: '1234',
      agreement: true,
    };

    useStore.getState().addFormData(testData);

    const state = useStore.getState();
    expect(state.formDataList).toHaveLength(1);
    expect(state.formDataList[0]).toEqual(testData);
  });

  it('should reset form data', () => {
    const testData: FormData = {
      name: 'Test',
      age: 30,
      email: 'test@example.com',
      gender: 'male',
      country: 'USA',
      file: 'test.png',
      password: 'pass',
      confirmedPassword: 'pass',
      agreement: true,
    };

    useStore.getState().addFormData(testData);
    expect(useStore.getState().formDataList).toHaveLength(1);

    useStore.getState().resetFormData();
    expect(useStore.getState().formDataList).toEqual([]);
  });
});
