import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const [transactions, setTransactions] = useState([]);

  const [transaction, setTransaction] = useState({
    nome: "",
    categoria: "",
    data: "",
    valor: "",
  });

  console.log(transactions);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = () => {
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
        setTransactions(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const submitTransaction = (event) => {
    event.preventDefault();

    const url =
      "https://sheet2api.com/v1/rtjzbZKQ2CY1/budget-management/P%C3%A1gina1";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...transaction,
        id: uuidv4(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactions([...transactions, data]);
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const removeTransaction = (id) => {
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
        const filteredTransactions = transactions.filter((value) => {
          return value.id != id;
        });

        setTransactions(filteredTransactions);

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
          {transactions.length !== 0 ? (
            transactions.map((transaction, key) => (
              <tr key={key}>
                <td>{transaction.id ?? ""}</td>
                <td>{transaction.nome}</td>
                <td>{transaction.categoria}</td>
                <td>{transaction.valor}</td>
                <td>{transaction.data}</td>
                <td>
                  <button onClick={() => removeTransaction(transaction.id)}>
                    Remover
                  </button>
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
          value={transaction.nome}
          type="text"
          id="nome"
          name="nome"
          onChange={(e) =>
            setTransaction({ ...transaction, nome: e.target.value })
          }
        />
        <br />
        <br />
        <label htmlFor="categoria">Categoria:</label>
        <input
          value={transaction.categoria}
          type="text"
          id="categoria"
          name="categoria"
          onChange={(e) =>
            setTransaction({ ...transaction, categoria: e.target.value })
          }
        />
        <br />
        <br />
        <label htmlFor="valor">Valor:</label>
        <input
          value={transaction.valor}
          type="number"
          id="valor"
          name="valor"
          onChange={(e) =>
            setTransaction({ ...transaction, valor: e.target.value })
          }
        />
        <br />
        <br />
        <label htmlFor="data">Data:</label>
        <input
          value={transaction.data}
          type="date"
          id="data"
          name="data"
          onChange={(e) =>
            setTransaction({ ...transaction, data: e.target.value })
          }
        />
        <br />
        <br />
        <button onClick={submitTransaction}>Submit</button>
      </form>
    </>
  );
}

export default Home;
