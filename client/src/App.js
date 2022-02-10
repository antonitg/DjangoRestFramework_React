import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import React from "react";
import AuthRoute from './core/AuhtRoute'
import AdminRoute from "./core/AdminRoute";

export default function App() {
const Auth = React.lazy(() => import("./pages/Auth"));
const Sidebar = React.lazy(() => import("./components/Sidebar"))
const StartPoints = React.lazy(() => import("./components/StartPoints"))
const History = React.lazy(() => import("./pages/History"))
const Pricing = React.lazy(() => import("./pages/Pricing"))
// const AuthRoute = React.lazy(() => import("./core/AuthRoute"))
const StartJourney = React.lazy(() => import("./components/StartJourney"))
const AdminStationsManagement = React.lazy(() => import("./components/AdminStationsManagement"))

return (
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<React.Suspense fallback={<>...</>}><AuthRoute><Sidebar/></AuthRoute></React.Suspense>}>
        <Route path="/"  element={<StartPoints />}>
          <Route path="/" element={<StartJourney/>}/>
        </Route>
        <Route path="/history" element={<History/>} />
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/admin" element={<React.Suspense fallback={<>...</>}><AdminRoute><AdminStationsManagement/></AdminRoute></React.Suspense>} />
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
