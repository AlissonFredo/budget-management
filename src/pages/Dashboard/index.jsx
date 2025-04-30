import { useEffect } from "react";
import { useState } from "react";
import ModalAddTransaction from "../../components/ModalAddTransaction";
import ListTransactions from "../../components/ListTransactions";
import Filter from "../../components/Filter";
import Container from "@/components/Container";
import Header from "@/components/Header";
import SummaryCards from "@/components/SummaryCards";
import CardBarChart from "@/components/CardBarChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { transactionsSearch } from "@/service/transactionsService";
import CardPieChart from "@/components/CardPieChart";
import { useNavigate } from "react-router";
import IncomeTable from "@/components/IncomeTable";

function Dashboard() {
  const navigate = useNavigate();
  const sheet2apiLink = localStorage.getItem("sheet2apiLink");
  if (sheet2apiLink == null) navigate("/setup");

  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedYears, setSelectedYears] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTransactions();
  }, [selectedMonth, selectedYears]);

  const getTransactions = async () => {
    setIsLoading(true);

    const month = selectedMonth != "all" ? selectedMonth : "";
    const year = selectedYears != "all" ? selectedYears : "";

    const result = await transactionsSearch(month, year);

    setTransactions(result);

    setIsLoading(false);
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

      <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
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

      <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <CardBarChart />

        <CardPieChart transactions={transactions} isLoading={isLoading} />

        <IncomeTable />
      </section>
    </Container>
  );
}

export default Dashboard;
