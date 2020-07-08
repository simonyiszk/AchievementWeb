import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { Helmet } from 'react-helmet';

import { Layout } from '../components/Layout';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function NotFoundPage(_props: RouteComponentProps): JSX.Element {
  return (
    <Layout>
      <Helmet>
        <title>Page not found</title>
      </Helmet>

      <h1>Page not found</h1>
      <p>The requested page is unavailable.</p>
    </Layout>
  );
}
