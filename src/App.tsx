import { LazyMotion, MotionConfig } from 'motion/react';
import { Route, Routes } from 'react-router';
import { Layout } from './components/layout/Layout';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Privacy from './pages/Privacy';
import Services from './pages/Services';

const loadMotionFeatures = () => import('./lib/motion-features').then((m) => m.default);

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy-policy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </LazyMotion>
    </MotionConfig>
  );
}
