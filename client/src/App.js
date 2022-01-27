import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import React from "react";
import AuthRoute from './core/AuhtRoute'

export default function App() {
const Auth = React.lazy(() => import("./pages/Auth"));
const Sidebar = React.lazy(() => import("./components/Sidebar"))
const StartPoints = React.lazy(() => import("./components/StartPoints"))
const History = React.lazy(() => import("./pages/History"))
const Pricing = React.lazy(() => import("./pages/Pricing"))
// const AuthRoute = React.lazy(() => import("./components/AuthRoute"))
const StartJourney = React.lazy(() => import("./components/StartJourney"))

return (
    <BrowserRouter>
    <Routes>

      <Route path="/"  element={<React.Suspense fallback={<>...</>}><AuthRoute><Sidebar/></AuthRoute></React.Suspense>}>
      
        <Route path="/"  element={<StartPoints />}>
          <Route path="/" element={<StartJourney/>}/>
        </Route>
        <Route path="/history" element={<History/>} />
        <Route path="/pricing" element={<Pricing/>} />
      </Route>
      <Route path="auth" element={
              <React.Suspense fallback={<>...</>}>
                <Auth/>
              </React.Suspense>
            }/>
      <Route path="*" element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
    </Routes>
  </BrowserRouter>
  );
}
