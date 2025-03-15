import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [rows, setRows] = useState([]);

  console.log(rows);

  useEffect(() => {
    getRows();
  }, []);

  const getRows = () => {
    const query_params = new URLSearchParams({
      limit: 10,
      // query_type: "and",
      // nome: "example value",
      // categoria: "example value",
      // data: "example value",
      // valor: "example value",
    });

    const url =
      "https://sheet2api.com/v1/rtjzbZKQ2CY1/budget-management/P%C3%A1gina1?" +
      query_params;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <h1>Budget Management</h1>

      <table>
        <tr>
          <th>Nome</th>
          <th>Categoria</th>
          <th>Valor</th>
          <th>Data</th>
        </tr>

        {rows.length !== 0
          ? rows.map((row, key) => (
              <tr key={key}>
                <th>{row.nome}</th>
                <th>{row.categoria}</th>
                <th>{row.valor}</th>
                <th>{row.data}</th>
              </tr>
            ))
          : ""}
      </table>
    </>
  );
}

export default App;
