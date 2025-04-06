import { useEffect } from "react";
import { useState } from "react";
import ModalAddTransaction from "../../components/ModalAddTransaction";
import ListTransactions from "../../components/ListTransactions";
import Filter from "../../components/Filter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Container from "@/components/Container";

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

  const outgoing = transactions
    .filter((transaction) => transaction?.type == "outgoing")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const incoming = transactions
    .filter((transaction) => transaction?.type == "incoming")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const currentBalance = incoming - outgoing;

  const spendingPercentage =
    incoming > 0 ? Math.min(Math.round((outgoing / incoming) * 100), 100) : 0;

  const getIncomeBalanceMessage = () => {
    if (currentBalance >= 0) {
      const percentage =
        currentBalance != 0 ? Math.round((currentBalance / incoming) * 100) : 0;
      return `You're saving ${percentage}% of your income`;
    }

    if (incoming == 0) {
      return "Your spending exceeds 100%... out of nowhere";
    }

    const percentage = Math.round((Math.abs(currentBalance) / incoming) * 100);
    return `You're spending ${percentage}% more than your income`;
  };

  return (
    <Container>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Budget Management
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Track your income and expenses with our intuitive budget management
          dashboard
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <Card className="overflow-hidden border-t-4 border-t-emerald-500">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                Total Income
              </CardTitle>
              <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900/20">
                <ArrowUpCircle className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
            <CardDescription className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3" /> Monthly earnings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">
              ${incoming.toFixed(2)}
            </div>
            <div className="mt-4 h-1 w-full rounded-full bg-emerald-100 dark:bg-emerald-900/20">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: "100%" }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-t-4 border-t-rose-500">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                Total Expenses
              </CardTitle>
              <div className="rounded-full bg-rose-100 p-2 dark:bg-rose-900/20">
                <ArrowDownCircle className="h-5 w-5 text-rose-500" />
              </div>
            </div>
            <CardDescription className="flex items-center text-sm text-muted-foreground">
              <TrendingDown className="mr-1 h-3 w-3" /> Monthly spending
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-rose-600">
              ${outgoing.toFixed(2)}
            </div>
            <div className="mt-4 flex items-center">
              <Progress value={spendingPercentage} className="h-2" />
              <span className="ml-2 text-sm text-muted-foreground">
                {spendingPercentage}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`overflow-hidden border-t-4 ${
            currentBalance >= 0 ? "border-t-sky-500" : "border-t-amber-500"
          }`}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                Current Balance
              </CardTitle>
              <div
                className={`rounded-full p-2 ${
                  currentBalance >= 0
                    ? "bg-sky-100 dark:bg-sky-900/20"
                    : "bg-amber-100 dark:bg-amber-900/20"
                }`}
              >
                <Wallet
                  className={`h-5 w-5 ${
                    currentBalance >= 0 ? "text-sky-500" : "text-amber-500"
                  }`}
                />
              </div>
            </div>
            <CardDescription className="flex items-center text-sm text-muted-foreground">
              {currentBalance >= 0 ? "Savings" : "Deficit"} this period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`text-3xl font-bold ${
                currentBalance >= 0 ? "text-sky-600" : "text-amber-600"
              }`}
            >
              ${Math.abs(currentBalance).toFixed(2)}
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              {getIncomeBalanceMessage()}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="">
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
    </Container>
  );
}

export default Home;
