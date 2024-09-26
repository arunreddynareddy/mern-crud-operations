import './App.css';
import {Routes, Route} from "react-router-dom"
import GetUser from './GetUser/GetUser.jsx';
import CreateUser from './CreateUser/CreateUser.jsx';
import UpdateUser from './UpdateUser/UpdateUser.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GetUser />} />
      <Route path="/create" element={<CreateUser />} />
      <Route path="/update/:id" element={<UpdateUser />} />
    </Routes>
  );
}

export default App;
