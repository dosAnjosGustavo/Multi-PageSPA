import React from 'react';

import NewsletterSignup from '../components/NewsletterSignup';
import PageContent from '../components/PageContent';
import { ActionFunction } from 'react-router-dom';

function NewsletterPage() {
  return (
    <PageContent title="Join our awesome newsletter!">
      <NewsletterSignup />
    </PageContent>
  );
}

export default NewsletterPage;

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const email = data.get('email');

  // send to backend newsletter server ...
  console.log(email);
  return { message: 'Signup successful!' };
};
