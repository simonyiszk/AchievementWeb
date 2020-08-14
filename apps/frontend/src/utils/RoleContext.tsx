import React from 'react';
const { Provider, Consumer } = React.createContext('');

import { getRoles } from '../utils/auth';

export interface RoleProviderProps {
  children: React.ReactNode;
}

function RoleProvider({ children }: RoleProviderProps): JSX.Element {
  return <Provider value={getRoles()}>{children}</Provider>;
}

export { RoleProvider, Consumer as RoleConsumer };
