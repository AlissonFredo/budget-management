import { useEffect } from "react";
import { useState } from "react";
import ModalAddTransaction from "../../components/ModalAddTransaction";
import ListTransactions from "../../components/ListTransactions";
import Filter from "../../components/Filter";

function Home() {
  const [transactions, setTransactions] = useState([]);

  const [queryParams, setQueryParams] = useState({
    limit: 99,
    query_type: "and",
    month: new Date().toLocaleString("en-US", { month: "long" }).toLowerCase(),
  });

  useEffect(() => {
    getTransactions();
  }, [queryParams]);

  const getTransactions = async () => {
    try {
      const query_params = new URLSearchParams(queryParams);

      const url =
        "https://sheet2api.com/v1/rtjzbZKQ2CY1/budget-management/page1?" +
        query_params;

      const response = await fetch(url);
      const data = await response.json();
      console.log("Response to fetch transactions", data);

      if (Array.isArray(data)) {
        setTransactions(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const calculateOutgoing = () => {
    const outgoings = transactions.filter(
      (transaction) => transaction?.type == "outgoing"
    );

    let total = 0;

    outgoings.forEach((outgoing) => {
      total += outgoing.amount;
    });

    return total;
  };

  const calculateIncoming = () => {
    const incomings = transactions.filter(
      (transaction) => transaction?.type == "incoming"
    );

    let total = 0;

    incomings.forEach((incoming) => {
      total += incoming.amount;
    });

    return total;
  };

  const calculeBalance = () => {
    const incoming = calculateIncoming();
    const outgoing = calculateOutgoing();

    return incoming - outgoing;
  };

  return (
    <>
      <header className="text-start p-4 bg-blue-400">
        <h1 className="text-white text-lg font-semibold">Budget Management</h1>
      </header>

      <section className="px-5">
        <section className="grid grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-white">
            <h3 className="text-lg font-semibold">Incoming</h3>
            <p>R$ {calculateIncoming()}</p>
          </div>
          <div className="p-4 bg-white">
            <h3 className="text-lg font-semibold">Outgoing</h3>
            <p>R$ {calculateOutgoing()}</p>
          </div>
          <div className="p-4 bg-white">
            <h3 className="text-lg font-semibold">Balance</h3>
            <p>R$ {calculeBalance()}</p>
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

          <Filter
            handleSelectedMonth={(month) =>
              setQueryParams({ ...queryParams, month: month })
            }
          />

          <ListTransactions
            transactions={transactions}
            handleRemoveTransaction={(filteredTransactions) =>
              setTransactions(filteredTransactions)
            }
          />
        </section>
      </section>
    </>
  );
}

export default Home;
