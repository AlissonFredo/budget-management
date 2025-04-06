import { useEffect } from "react";
import { useState } from "react";
import ModalAddTransaction from "../../components/ModalAddTransaction";
import ListTransactions from "../../components/ListTransactions";
import Filter from "../../components/Filter";
import Container from "@/components/Container";
import Header from "@/components/Header";
import SummaryCards from "@/components/SummaryCards";

function Home() {
  const [transactions, setTransactions] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState("all");

  useEffect(() => {
    getTransactions();
  }, [selectedMonth]);

  const getTransactions = async () => {
    try {
      let query = {
        limit: 999,
      };

      if (selectedMonth != "all") {
        query = {
          ...query,
          query_type: "and",
          month: selectedMonth,
        };
      }

      query = new URLSearchParams(query);

      const url =
        "https://sheet2api.com/v1/rtjzbZKQ2CY1/budget-management/page1?" +
        query;

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

  const outgoing = transactions
    .filter((transaction) => transaction?.type == "outgoing")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const incoming = transactions
    .filter((transaction) => transaction?.type == "incoming")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <Container>
      <Header />
      <SummaryCards incoming={incoming} outgoing={outgoing} />

      <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Filter
          totalTransactions={transactions.length}
          selectedMonth={selectedMonth}
          onSelectMonth={(month) => setSelectedMonth(month)}
        />

        <section className="md:col-span-3">
          <section className="bg-white p-4">
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

            <ListTransactions
              transactions={transactions}
              handleRemoveTransaction={(filteredTransactions) =>
                setTransactions(filteredTransactions)
              }
            />
          </section>
        </section>
      </section>
    </Container>
  );
}

export default Home;
