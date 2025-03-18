import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [rows, setRows] = useState([]);

  const [row, setRow] = useState({
    nome: "",
    categoria: "",
    data: "",
    valor: "",
  });

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

  const submitRow = (event) => {
    event.preventDefault();

    const rowRequest = { ...row, id: uuidv4() };

    const url =
      "https://sheet2api.com/v1/rtjzbZKQ2CY1/budget-management/P%C3%A1gina1";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rowRequest),
    })
      .then((response) => response.json())
      .then((data) => {
        setRows([...rows, data]);
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const removeRow = (id) => {
    const query_params = new URLSearchParams({
      limit: 1,
      query_type: "and",
      id: id,
    });
    const url =
      "https://sheet2api.com/v1/rtjzbZKQ2CY1/budget-management/P%C3%A1gina1?" +
      query_params;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then((data) => {
        const rowsNew = rows.filter((value) => {
          return value.id != id;
        });

        setRows(rowsNew);

        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <h1>Budget Management</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {rows.length !== 0 ? (
            rows.map((row, key) => (
              <tr key={key}>
                <td>{row.id ?? ""}</td>
                <td>{row.nome}</td>
                <td>{row.categoria}</td>
                <td>{row.valor}</td>
                <td>{row.data}</td>
                <td>
                  <button onClick={() => removeRow(row.id)}>Remover</button>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>

      <form>
        <label htmlFor="nome">Nome:</label>
        <input
          value={row.nome}
          type="text"
          id="nome"
          name="nome"
          onChange={(e) => setRow({ ...row, nome: e.target.value })}
        />
        <br />
        <br />
        <label htmlFor="categoria">Categoria:</label>
        <input
          value={row.categoria}
          type="text"
          id="categoria"
          name="categoria"
          onChange={(e) => setRow({ ...row, categoria: e.target.value })}
        />
        <br />
        <br />
        <label htmlFor="valor">Valor:</label>
        <input
          value={row.valor}
          type="number"
          id="valor"
          name="valor"
          onChange={(e) => setRow({ ...row, valor: e.target.value })}
        />
        <br />
        <br />
        <label htmlFor="data">Data:</label>
        <input
          value={row.data}
          type="date"
          id="data"
          name="data"
          onChange={(e) => setRow({ ...row, data: e.target.value })}
        />
        <br />
        <br />
        <button onClick={submitRow}>Submit</button>
      </form>
    </>
  );
}

export default App;
