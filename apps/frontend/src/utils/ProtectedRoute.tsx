import React from 'react';
import { navigate } from 'gatsby';
import { RouteComponentProps } from '@reach/router';

import { isGroupLead, isAdmin } from './auth';
import { RoleConsumer } from './RoleContext';

export interface Props extends RouteComponentProps {
  component: React.FC<any>;
  groupLeads?: number[];
  admin?: boolean;
}

export default function ProtectedRoute({
  component: Component,
  groupLeads = [],
  admin = false,
  ...rest
}: Props): JSX.Element {
  return (
    <RoleConsumer>
      {(roles) => {
        const adminFlag = admin && isAdmin(roles);
        const roleFlag = groupLeads.reduce((acc: boolean, curr: number) => {
          return acc && isGroupLead(roles, curr);
        }, true);
        const noFlag = !admin && groupLeads.length === 0;
        const canRender = adminFlag || roleFlag || noFlag;

        if (!canRender) {
          navigate('/', { replace: true });
          return null;
        }
        return <Component {...rest} />;
      }}
    </RoleConsumer>
  );
}
