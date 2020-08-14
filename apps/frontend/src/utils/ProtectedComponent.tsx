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
        const adminFlag = !admin || (admin && isAdmin(roles));
        const roleFlag =
          groupLeads.length === 0 ||
          groupLeads.reduce((acc: boolean, curr: number) => {
            return acc && isGroupLead(roles, curr);
          }, true);
        const canRender = adminFlag && roleFlag;

        if (canRender) {
          return <div>{children}</div>;
        } else {
          return <div></div>;
        }
      }}
    </RoleConsumer>
  );
}
