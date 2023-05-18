import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Update from "./update";
import Toast from "./Toast"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" index element={<Home/>}/>
      <Route path="/home" index element={<Home/>}/>
        <Route path="/update" element={<Update/>}/>
        <Route path="/toast" element={<Toast/>}/>
    </Routes>


    </>
  );
}

export default App;
