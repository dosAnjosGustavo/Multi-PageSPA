import React from 'react';
import PageContent from '../components/PageContent';
import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

interface Error {
  data: any;
  status: number;
}

function ErrorPage() {
  const error = useRouteError() as Error;
  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  console.log(error.status);

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
