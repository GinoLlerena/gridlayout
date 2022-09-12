import "./styles.css";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Preview from "./components/Preview";

export default function App() {
  return (
        <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="preview" element={<Preview />} />
        </Routes>
  );
}
