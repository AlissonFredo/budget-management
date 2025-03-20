import { useEffect } from "react";
import { useState } from "react";
import ModalAddTransaction from "../../components/ModalAddTransaction";

function Home() {
  const [transactions, setTransactions] = useState([]);

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
      <header className="text-start p-4 bg-blue-400">
        <h1 className="text-white text-lg font-semibold">Budget Management</h1>
      </header>
      <section className="px-5">
        <section className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-white">
            <h3 className="text-lg font-semibold">Incoming</h3>
            <p>R$ 1.000</p>
          </div>
          <div className="p-4 bg-white">
            <h3 className="text-lg font-semibold">Outgoing</h3>
            <p>R$ 500</p>
          </div>
        </section>

        <section className="mt-4 bg-white p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold">Transactions</h2>
            </div>
            <div className="text-end">
              <ModalAddTransaction
                handleNewTransaction={(newTransaction) =>
                  setTransactions([...transactions, newTransaction])
                }
              />
            </div>
          </div>

          <div>
            <ul>
              {transactions.length !== 0 ? (
                transactions.map((transaction, key) => (
                  <li key={key} className="flex">
                    <div className="w-15 flex justify-center items-center">
                      <div className="size-15 rounded-full bg-gray-400"></div>
                    </div>
                    <div className="w-1/1 flex justify-between pl-2 py-2">
                      <div>
                        <h1 className="text-lg font-semibold">
                          {transaction.nome}
                        </h1>
                        <h1 className="text-lg font-semibold">
                          {transaction.categoria}
                        </h1>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="w-20 flex items-center mr-3">
                          <h1 className="text-lg font-semibold">
                            R$ {transaction.valor}
                          </h1>
                        </div>
                        <div className="flex justify-end items-center">
                          <button
                            onClick={() => removeTransaction(transaction.id)}
                            className="text-start p-3 bg-red-400 text-white text-sm font-semibold cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <></>
              )}
            </ul>
          </div>
        </section>
      </section>
    </>
  );
}

export default Home;
