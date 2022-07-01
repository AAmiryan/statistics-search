import { Link, Route, Routes } from "react-router-dom";
import Search from "../Search/Search";
import SearchStatistics from "../Statistics/Statistics";
import "./Main.css";

const Main = () => {
  return (
    <div className="mainContainer">
      <div className="navBar">
        <Link to="/" className="link">
          Search
        </Link>
        <Link to="/statistics" className="link">
          Statistics
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/statistics" element={<SearchStatistics />} />
      </Routes>
    </div>
  );
};
export default Main;
