import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import TableContext from "../../Context/TableContext";

const TableIndex = () => {
  const { tables, getTables, deleteTable } = useContext(TableContext);

  useEffect(() => {
    getTables();
  }, []);

  return (
    <div className='mt-12'>
      <div className='flex justify-between'>
        <div className='flex justify-start m-2 p-2'>
          <Link
            to='/tables/create'
            className='bg-green-500 rounded-md px-4 py-2 hover:bg-green-700 hover:text-white'
          >
            Select Date
          </Link>
        </div>
        <div className='flex justify-end m-2 p-2'>
          <Link
            to='/tables/create'
            className='bg-green-500 rounded-md px-4 py-2 hover:bg-green-700 hover:text-white'
          >
            Create Table
          </Link>
        </div>
      </div>

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                ID
              </th>
              <th scope='col' className='px-6 py-3'>
                Table Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Peoples
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table, index) => {
              return (
                <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700' key={index}>
                  <td
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    {table.id}
                  </td>
                  <td className='px-6 py-4'>{table.name}</td>
                  <td className='px-6 py-4'>{table.peoples}</td>

                  <td className='px-6 py-4 space-x-2'>
                    <Link
                      to={`/tables/${table.id}/edit`}
                      className='bg-green-500 text-black rounded-md px-4 py-2 hover:bg-green-700 hover:text-white'
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteTable(table.id)}
                      className='bg-red-500 text-black rounded-md px-4 py-2 hover:bg-red-700 hover:text-white'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableIndex;
