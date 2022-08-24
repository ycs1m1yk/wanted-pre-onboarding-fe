import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectRoutes from "./components/protectRoutes";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Todo from "./pages/todo";
import NotFound from "./pages/notFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
