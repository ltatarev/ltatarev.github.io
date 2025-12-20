import React from 'react';
import { Link } from 'gatsby';

export default function LumeePage() {
  return (
    <div className="ease m-auto mb-20 flex min-w-min max-w-screen-xl flex-col items-center p-10 transition-all duration-75">
      <h1 className="mb-6 text-4xl font-bold">✨ Lumee</h1>
      <div className="flex flex-col gap-4">
        <Link className="text-lg" to="/lumee/privacy-policy">
          Privacy Policy
        </Link>
        <Link className="text-lg" to="/lumee/terms-of-service">
          Terms of Service
        </Link>
      </div>
    </div>
  );
}

export function Head() {
  return (
    <>
      <title>Lumee</title>
      <meta charSet="utf-8" />
      <meta content="index,follow" name="robots" />
    </>
  );
}
