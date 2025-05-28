import { useEffect, useState } from "react";
import ModalAddTransaction from "../../components/ModalAddTransaction";
import ListTransactions from "../../components/ListTransactions";
import Filter from "../../components/Filter";
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
import ExpensesTable from "@/components/ExpensesTable";
import { useTranslation } from "react-i18next";

function Dashboard() {
  const navigate = useNavigate();
  const sheet2apiLink = localStorage.getItem("sheet2apiLink");

  const { t } = useTranslation();

  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedYears, setSelectedYears] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (sheet2apiLink == null) {
      navigate("/setup");
    } else {
      getTransactions();
    }
  }, [selectedMonth, selectedYears]);

  const getTransactions = async () => {
    setIsLoading(true);

    const month = selectedMonth != "all" ? selectedMonth : "";
    const year = selectedYears != "all" ? selectedYears : "";

    const response = await transactionsSearch(month, year);

    if (response.status == 400) {
      alert(t("alert1"));
    } else if (response.status == 402) {
      alert(t("alert2"));
    } else if (response.status == 404) {
      alert(t("alert3"));
    } else if (response.status == 429) {
      alert(t("alert4"));
    } else if (response.status == 200) {
      const data = await response.json();

      setTransactions(data);
    }

    setIsLoading(false);
  };

  const outgoing = transactions
    .filter((transaction) => transaction?.type == "outgoing")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const incoming = transactions
    .filter((transaction) => transaction?.type == "incoming")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <main className="container mx-auto py-8 px-4 md:px-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          {t("dashboard.title")}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("dashboard.subtitle")}
        </p>
      </header>

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
                <CardTitle className="text-2xl">{t("filter.label2")}</CardTitle>
                <CardDescription>
                  {transactions.length} {t("list.description")}
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

        <ExpensesTable />
      </section>
    </main>
  );
}

export default Dashboard;
