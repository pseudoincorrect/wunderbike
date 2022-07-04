import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';

import { UserProvider } from '@auth0/nextjs-auth0';
import React from 'react';

import type { AppProps } from 'next/app';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
