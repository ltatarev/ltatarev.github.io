import React from 'react';
import { Helmet } from 'react-helmet';
import { Header } from '../components';

export default function IndexPage() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>ltatarev</title>
      </Helmet>
      <Header />
    </>
  );
}
