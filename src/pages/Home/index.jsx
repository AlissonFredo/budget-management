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

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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

  const chartData = [
    { month: "January", income: 186, outgoing: 80 },
    { month: "February", income: 305, outgoing: 200 },
    { month: "March", income: 237, outgoing: 120 },
    { month: "April", income: 73, outgoing: 190 },
    { month: "May", income: 209, outgoing: 130 },
    { month: "June", income: 214, outgoing: 140 },
    { month: "July", income: 214, outgoing: 140 },
    { month: "August", income: 214, outgoing: 140 },
    { month: "September", income: 214, outgoing: 140 },
    { month: "October", income: 214, outgoing: 140 },
    { month: "November", income: 214, outgoing: 140 },
    { month: "December", income: 214, outgoing: 140 },
  ];

  const chartConfig = {
    income: {
      label: "Income",
      color: "#7dcf9c",
    },
    outgoing: {
      label: "Expenses",
      color: "#f87171",
    },
  };

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
        <Card className="md:col-span-2">
          <CardHeader className="border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <CardTitle className="text-2xl">
                  Incomes & Expenses (Yearly)
                </CardTitle>
                <CardDescription>
                  Annual comparison between income and expenses
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] w-full"
            >
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                <Bar
                  dataKey="outgoing"
                  fill="var(--color-outgoing)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>
    </Container>
  );
}

export default Home;
