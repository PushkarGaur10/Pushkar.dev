// pages/_app.js
import React, { useState, useEffect } from 'react';
import Loader from '@/components/Loader';
import '@/styles/globals.css';
import useLenis from "@/hooks/useLenis";

function MyApp({ Component, pageProps }) {

  useLenis(); // Activate smooth scrolling

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
