import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import { TableProvider } from "./Context/TableContext";
import TableCreate from "./components/tables/TableCreate";
import TableEdit from "./components/tables/TableEdit";
import TableIndex from "./components/tables/TableIndex";

function App() {
  return (
    <TableProvider>
      <div className='bg-slate-300'>
        <div className='max-w-7xl mx-auto min-h-screen'>
          <nav>
            <ul className='flex'>
              <li className='m-2 p-2 bg-green-500 hover:bg-green-700 text-black rounded-md'>
                <Link to='/'>Home</Link>
              </li>
              <li className='m-2 p-2 bg-green-500 hover:bg-green-700 text-black rounded-md'>
                <Link to='/tables'>tables</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/tables' element={<TableIndex />} />
            <Route path='/tables/create' element={<TableCreate />} />
            <Route path='/tables/:id/edit' element={<TableEdit />} />
          </Routes>
        </div>
      </div>
    </TableProvider>
  );
}

export default App;
