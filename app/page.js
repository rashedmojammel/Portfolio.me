import dynamic from 'next/dynamic';

import Loader from '@/components/layout/Loader';
import Header from '@/components/layout/Header';
import ScrollProgress from '@/components/layout/ScrollProgress';
import CustomCursor from '@/components/layout/CustomCursor';
import BackToTop from '@/components/layout/BackToTop';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';

import Hero from '@/components/home/Hero';
// import VideoCV from '@/components/sections/VideoCV';
import About from '@/components/sections/About';
// import Academic from '@/components/sections/Academic';
import Portfolio from '@/components/sections/Portfolio';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

import AIChatWidgetLoader from '@/components/ai-chat/AIChatWidgetLoader';
import GithubActivity from '@/components/sections/GithubActivity';

// Below-the-fold sections: still server-rendered (good for SEO), but split
// into their own JS chunk so they aren't part of the initial bundle the
// browser has to parse before the page is interactive.
const Certificates = dynamic(() => import('@/components/sections/Certificates'));
const Hobbies = dynamic(() => import('@/components/sections/Hobbies'));

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Loader />
      <ScrollProgress />
      <CustomCursor />
      <Header />

      <Hero />
      {/* <VideoCV /> */}
      <About />
      <Portfolio />
      <Skills />
      <Certificates />
      <Hobbies />
      <GithubActivity />
      <Contact />

      <Footer />
      <BackToTop />
      <AIChatWidgetLoader />
    </>
  );
}
