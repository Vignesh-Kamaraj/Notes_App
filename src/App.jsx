import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Notes from "./components/Notes";
import Edit from "./components/Edit";
import UserContext from "./components/context/UserContext";

function App() {
  return (
    <>
      <div className="d-flex flex-row body">
        <BrowserRouter>
          <Sidebar />
          <div className=" container-fluid content">
            <Routes>
              <Route
                path="/"
                element={
                  <UserContext>
                    <Content />
                  </UserContext>
                }
              />
              <Route
                path="notes"
                element={
                  <UserContext>
                    <Content />
                    <Notes />
                  </UserContext>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <UserContext>
                    <Edit />
                  </UserContext>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
