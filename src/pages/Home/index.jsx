import { useEffect } from "react";
import { useState } from "react";
import ModalAddTransaction from "../../components/ModalAddTransaction";
import ListTransactions from "../../components/ListTransactions";
import Filter from "../../components/Filter";
import Container from "@/components/Container";
import Header from "@/components/Header";
import SummaryCards from "@/components/SummaryCards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Home() {
  const [transactions, setTransactions] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedYears, setSelectedYears] = useState("all");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTransactions();
  }, [selectedMonth, selectedYears]);

  const getTransactions = async () => {
    try {
      setIsLoading(true);

      let query = {
        limit: 999,
        query_type: "and",
      };

      if (selectedMonth != "all") {
        query = {
          ...query,
          month: selectedMonth,
        };
      }

      if (selectedYears != "all") {
        query = {
          ...query,
          year: selectedYears,
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

      setIsLoading(false);
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
          selectedYears={selectedYears}
          onSelectedYears={(year) => setSelectedYears(year)}
        />

        <Card className="md:col-span-3">
          <CardHeader className="border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <CardTitle className="text-2xl">Transactions</CardTitle>
                <CardDescription>
                  {transactions.length} transactions found
                </CardDescription>
              </div>
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <ModalAddTransaction
                  handleNewTransaction={(newTransaction) =>
                    setTransactions([...transactions, newTransaction])
                  }
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ListTransactions
              transactions={transactions}
              isLoading={isLoading}
              handleRemoveTransaction={(filteredTransactions) =>
                setTransactions(filteredTransactions)
              }
            />
          </CardContent>
        </Card>
      </section>
    </Container>
  );
}

export default Home;
