import React, { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";

import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Navbar from './components/Navbar/Navbar';
import PostEditor from './pages/PostEditor/PostEditor';
import './themeStyles/general.scss';

// Lazy loading pages components
const Homepage = lazy(() => import( /* webpackChunkName: "pages.homepage" */ "./pages/Homepage/Homepage"));
const PostDetails = lazy(() => import( /* webpackChunkName: "pages.recipe-details" */ "./pages/PostDetails/PostDetails"));
const About = lazy(() => import( /* webpackChunkName: "pages.about" */ "./pages/About/About"));

function App() {

  let links = [
    {
      label: 'Home',
      url: '/'
    },
    {
      label: 'About us',
      url: '/about'
    },
    {
      label: 'Second',
      url: '/second'
    }
    , {
      label: 'Third',
      url: '/third'
    }
    , {
      label: 'Fourth',
      url: '/Fourth'
    }
  ]

  return (
    <div className="main-container">
      <Navbar links={links} />
      <main className="main-content">
        <Suspense fallback={<LoadingScreen fullScreen />}>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="about" element={<About />} />
            <Route path="post/:id/" element={<PostDetails />} />
            <Route path="post/:id/edit/" element={<PostEditor />} />
            <Route path="post/new/" element={<PostEditor />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;