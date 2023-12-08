import { Home } from "components/Home/Home";
import { HomePage } from 'components/Homepage/Homepage';
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <Router>
      <Routes>
        <Route path='/chatbot' element={<Home />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
