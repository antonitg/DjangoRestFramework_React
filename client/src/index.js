import {
  render
} from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Objectives from "./routes/objectives";
import Rest from "./routes/rest";
const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="objectives" element={<Objectives />} />
        <Route path="rest" element={<Rest />} />
      </Route>
    </Routes>
  </BrowserRouter>,
    rootElement);