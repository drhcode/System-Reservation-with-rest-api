import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";
import Swal from "sweetalert2";

const TableContext = createContext();

const initialForm = {
  name: "",
  slug: "",
};

export const TableProvider = ({ children }) => {
  const [formValues, setFormValues] = useState(initialForm);

  const navigate = useNavigate();

  const [tables, setTables] = useState([]);
  const [table, setTable] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Store table
  const storeTable = async (e) => {
    e.preventDefault();
    try {
      await axios.post("tables", formValues);
      setFormValues(initialForm);
      navigate("/tables");
      Swal.fire({
        icon: "success",
        title: "Great",
        text: "Table added successfully",
      });
    } catch (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  // get all tables
  const getTables = async () => {
    const response = await axios.get("tables");
    setTables(response.data.data);
  };

  // get single table
  const getTable = async (id) => {
    const response = await axios.get("tables/" + id);
    const apiTable = response.data.data;
    setTable(apiTable);
    setFormValues({
      name: apiTable.name,
      peoples: apiTable.peoples,
    });
  };

  // update table
  const updateTable = async (e) => {
    e.preventDefault();
    try {
      await axios.put("tables/" + table.id, formValues);
      getTables();
      Swal.fire({
        icon: "success",
        title: "Great",
        text: "Table updated successfully",
      });
      setFormValues(initialForm);
      navigate("/tables");
    } catch (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  // delete table
  const deleteTable = async (id) => {
    const shouldDelete = await axios.delete("tables/" + id);
    if (shouldDelete) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
    getTables();
  };

  return (
    <TableContext.Provider
      value={{
        table,
        tables,
        getTable,
        getTables,
        handleChange,
        formValues,
        storeTable,
        errors,
        setErrors,
        updateTable,
        deleteTable,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableContext;
