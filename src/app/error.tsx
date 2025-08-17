'use client';

import { useEffect } from 'react';
import '../components/error/error.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="error-message">
      <p>Something went wrong</p>
      <button onClick={() => reset()}>reload</button>
    </div>
  );
}
