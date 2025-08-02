import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';

type ThemeContextType = {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  setIsDark: () => {},
});

export const ThemeProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const className = 'dark';
    const body = document.body;

    if (isDark) {
      body.classList.add(className);
    } else {
      body.classList.remove(className);
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const value = useContext(ThemeContext);
  if (value === undefined) throw new Error('Error');
  return value;
};
