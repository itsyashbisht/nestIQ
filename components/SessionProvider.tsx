'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/src/hooks/useAppDispatch';
import { useAppSelector } from '@/src/hooks/useAppSelector';
import { setAuthenticated, setInitialized } from '@/src/slices/auth.slice';
import { getMe } from '@/src/thunks/user.thunk';
import { Loader } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

export default function SessionProvider({ children }: Props) {
  const dispatch = useAppDispatch();

  const { isInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe())
      .unwrap()
      .then(() => {
        dispatch(setAuthenticated(true));
      })
      .catch(() => {
        dispatch(setAuthenticated(false));
      })
      .finally(() => {
        dispatch(setInitialized());
      });
  }, [dispatch]);

  // Show loader while session is being restored
  if (!isInitialized) {
    return <Loader />;
  }

  return <>{children}</>;
}
