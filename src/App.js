import './App.css';
import { Route, Routes } from "react-router-dom";
import GeneratePage from "./Generate";
import BirthdayCard from './BirthdayCard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <GeneratePage/>
          }
        />
        <Route
          path="/*"
          element={<BirthdayCard/>}
        />
      </Routes>
    </div>
  );
}

export default App;
