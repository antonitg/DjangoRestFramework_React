import Objectives from "./routes/objectives";
import Rest from "./routes/rest";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import React from "react";
import Sidebar from "./components/Sidebar";
import StartPoints from "./components/StartPoints";
import StartJourney from "./components/StartJourney"; 
import History from "./pages/History";

export default function App() {
const Auth = React.lazy(() => import("./pages/Auth"));
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Sidebar />}>
        <Route path="/"  element={<StartPoints />}>
          <Route path="/" element={<StartJourney/>}/>
        </Route>
        <Route path="/history" element={<History/>} />
        <Route path="objectives" element={<Objectives />} />
        <Route path="rest" element={<Rest />} />
      </Route>
      <Route path="auth" element={
              <React.Suspense fallback={<>...</>}>
                <Auth/>
              </React.Suspense>
            }/>
      <Route path="sidebar" element={<Sidebar/>}/>
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
