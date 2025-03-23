import { useEffect } from "react";
import { useState } from "react";
import ModalAddTransaction from "../../components/ModalAddTransaction";
import ListTransactions from "../../components/ListTransactions";

function Home() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const query_params = new URLSearchParams({
        limit: 10,
        // query_type: "and",
        // nome: "example value",
        // categoria: "example value",
        // data: "example value",
        // valor: "example value",
      });

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

  const monthName = new Date()
    .toLocaleString("en-US", { month: "long" })
    .toLowerCase();

  const [currentMonth, setCurrentMonth] = useState(monthName);

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

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

          <section className="mt-4 overflow-x-scroll ">
            <div className="flex py-4 justify-start">
              {months.map((month, key) => (
                <div
                  key={key}
                  className={`
                    ${key == 0 ? "mr-2" : "mx-2"}
                    lg:mx-auto 
                    p-2 
                    ${currentMonth == month ? "bg-blue-400" : "bg-blue-300"}
                    text-white 
                    text-sm 
                    min-w-20 
                    text-center
                    capitalize
                  `}
                  onClick={() => setCurrentMonth(month)}
                >
                  {month}
                </div>
              ))}
            </div>
          </section>

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
