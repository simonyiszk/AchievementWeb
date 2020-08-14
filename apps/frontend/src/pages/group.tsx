import { Router } from '@reach/router';
import React from 'react';

import { RoleProvider } from '../utils/RoleContext';

import ManageGroupPage from '../pages-dynamic/managegroup';
import ShowGroupPage from '../pages-dynamic/showgroup';
import NotFoundPage from './404';

export default function GroupPage(): JSX.Element {
  return (
    <RoleProvider>
      <Router basepath="/group">
        <ShowGroupPage path="/:id" />
        <ManageGroupPage path="/:id/manage" />
        <NotFoundPage default />
      </Router>
    </RoleProvider>
  );
}
