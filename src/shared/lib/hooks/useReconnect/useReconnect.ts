import { useEffect } from 'react';
import { useReconnect as useReconnectCore } from 'wagmi';

export const useReconnect = () => {
  const { reconnect } = useReconnectCore();

  useEffect(() => {
    reconnect();
  }, []);

  return null;
};
