import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Timeline } from "antd";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
