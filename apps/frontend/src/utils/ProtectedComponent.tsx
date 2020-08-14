import React from 'react';

import { isGroupLead, isAdmin } from './auth';
import { RoleConsumer } from './RoleContext';

export interface Props {
  children: React.ReactNode;
  groupLeads?: number[];
  admin?: boolean;
}

export default function ProtectedComponent({
  children,
  groupLeads = [],
  admin = false,
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

        if (canRender) {
          return children;
        } else {
          return null;
        }
      }}
    </RoleConsumer>
  );
}
