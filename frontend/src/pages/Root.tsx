import React, { useEffect } from 'react';

import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';

const RootLayout = () => {
  const token = useLoaderData();
  const submit = useSubmit();

  // const navigation = useNavigation();

  useEffect(() => {
    if (!token) return;

    if (token === 'expired') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
