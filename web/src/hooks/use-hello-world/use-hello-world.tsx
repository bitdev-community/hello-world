import { useState } from 'react';

interface HelloWorldState {
  data: string | null;
  loading: boolean;
  error: Error | null;
}

export const useHelloWorld = (): [HelloWorldState, () => Promise<void>] => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const host = process.env.REACT_APP_HELLO_API_HOST || 'https://hello.bitexamples.com';
  
  const fetchHelloWorld = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${host}/api/hello`);
      if (!response.ok) {
        throw new Error('Failed to load hello world');
      }

      const data = await response.text();
      setData(data);
      setLoading(false);
    } catch (e) {
      setError(e as Error);
      setLoading(false);
    }
  };

  const state: HelloWorldState = {
    data,
    loading,
    error,
  };

  return [state, fetchHelloWorld];
};
