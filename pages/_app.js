import { Fragment, useEffect } from 'react'
import Navbar from '../components/Navbar'
import store from '../redux/store';
import {Provider} from 'react-redux';
import '../styles/globals.css'
import {useRouter} from 'next/router';

import Progress from '../components/Progress/Progress';
import {useProgressStore} from '../store'

function MyApp({ Component, pageProps }) {
  const setIsAnimating = useProgressStore(state => state.setIsAnimating);
  const isAnimating = useProgressStore(state => state.isAnimating);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    }

    const handleStop = () => {
      setIsAnimating(false);
    }

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    }
  }, [router]);

  return (
    <Provider store={store}>
      
    <div dir='rtl'>
    <Progress isAnimating={isAnimating} />
      <Navbar/>
      <Component {...pageProps} />
    </div>    
    </Provider>
  )
}

export default MyApp
