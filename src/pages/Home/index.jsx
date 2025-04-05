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
    <main className="container mx-auto py-8 px-4 md:px-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Budget Management
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Track your income and expenses with our intuitive budget management
          dashboard
        </p>
      </header>

      <section className="">
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
                ${calculateIncoming().toFixed(2)}
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
                ${calculateOutgoing().toFixed(2)}
              </div>
              <div className="mt-4 flex items-center">
                <Progress value={10} className="h-2" />
                <span className="ml-2 text-sm text-muted-foreground">
                  {10}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className={`overflow-hidden border-t-4 border-t-sky-500`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">
                  Current Balance
                </CardTitle>
                <div
                  className={`rounded-full p-2 bg-sky-100 dark:bg-sky-900/20`}
                >
                  <Wallet className={`h-5 w-5 text-sky-500`} />
                </div>
              </div>
              <CardDescription className="flex items-center text-sm text-muted-foreground">
                Deficit this period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold text-sky-600`}>
                ${Math.abs(calculeBalance()).toFixed(2)}
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                You're spending 50% more than your income
              </div>
            </CardContent>
          </Card>
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
    </main>
  );
}

export default Home;
