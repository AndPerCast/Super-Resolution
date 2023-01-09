import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom/client";

const Home = lazy(() => import("./home"));
const About = lazy(() => import("./about"));
const SuperResolution = lazy(() => import("./super-resolution"));
const IlluminationEnhancer = lazy(() => import("./illumination-enhancer"));
const NoiseReduction = lazy(() => import("./noise-reduction"));

interface LinkIndex {
  path: string;
  component: React.FC;
}

const linksIndex: { [key: string]: LinkIndex } = {
  Home: {
    path: "/home",
    component: Home,
  },
  "Super Resolution": {
    path: "/super-resolution",
    component: SuperResolution,
  },
  "Illumination Enhancer": {
    path: "/illumination-enhancer",
    component: IlluminationEnhancer,
  },
  "Noise Reduction": {
    path: "/noise-reduction",
    component: NoiseReduction,
  },
  About: {
    path: "/about",
    component: About,
  },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {Object.entries(linksIndex).map(([name, link]) => {
            return (
              <Route key={name} path={link.path} element={<link.component />} />
            );
          })}
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>
);

export default linksIndex;
