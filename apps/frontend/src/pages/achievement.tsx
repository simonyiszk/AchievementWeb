import { Router } from '@reach/router';
import React from 'react';

import { RoleProvider } from '../utils/RoleContext';

import ShowAchievementPage from '../pages-dynamic/achievementdetails';
import NotFoundPage from './404';

export default function AchievementPage(): JSX.Element {
  return (
    <RoleProvider>
      <Router basepath="/achievement">
        <ShowAchievementPage path="/:id" />
        <NotFoundPage default />
      </Router>
    </RoleProvider>
  );
}
