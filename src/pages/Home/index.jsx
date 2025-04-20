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
import { Pie, PieChart } from "recharts";
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
  const [pieChart, setPieChart] = useState(false);

  useEffect(() => {
    getTransactions();
  }, [selectedMonth, selectedYears]);

  const getTransactions = async () => {
    setIsLoading(true);

    const month = selectedMonth != "all" ? selectedMonth : "";
    const year = selectedYears != "all" ? selectedYears : "";

    const result = await transactionsSearch(month, year);

    setTransactions(result);

    aggregateOutgoingByCategory(result);

    setIsLoading(false);
  };

  const outgoing = transactions
    .filter((transaction) => transaction?.type == "outgoing")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const incoming = transactions
    .filter((transaction) => transaction?.type == "incoming")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const mapColorPieChart = {
    Salary: "#e0e0e0",
    Freelance: "#f0b400",
    Investment: "#ff6b6b",
    Housing: "#4d8aff",
    Food: "#7d5fff",
    Utilities: "#a156f2",
    Dining: "#3880ff",
    Transportation: "#4f46e5",
    Entertainment: "#ffb347",
    Shopping: "#ff6f61",
    Health: "#226f54",
    Other: "#2bb673",
  };

  const chartConfig = {
    amount: {
      label: "Amount",
    },
    Salary: {
      label: "Salary",
      color: "#e0e0e0",
    },
    Freelance: {
      label: "Freelance",
      color: "#f0b400",
    },
    Investment: {
      label: "Investment",
      color: "#ff6b6b",
    },
    Housing: {
      label: "Housing",
      color: "#4d8aff",
    },
    Food: {
      label: "Food",
      color: "#7d5fff",
    },
    Utilities: {
      label: "Utilities",
      color: "#a156f2",
    },
    Dining: {
      label: "Dining",
      color: "#3880ff",
    },
    Transportation: {
      label: "Transportation",
      color: "#4f46e5",
    },
    Entertainment: {
      label: "Entertainment",
      color: "#ffb347",
    },
    Shopping: {
      label: "Shopping",
      color: "#ff6f61",
    },
    Health: {
      label: "Health",
      color: "#226f54",
    },
    Other: {
      label: "Other",
      color: "#2bb673",
    },
  };

  const aggregateOutgoingByCategory = (values = []) => {
    const transactionsOutgoings = values.filter(
      (transaction) => transaction.type == "outgoing"
    );

    let dataCharPie = [];

    transactionsOutgoings.forEach((transaction) => {
      if (dataCharPie.length == 0) {
        dataCharPie.push({
          category: transaction.category,
          amount: transaction.amount,
          fill: mapColorPieChart[transaction.category],
        });

        return;
      }

      const index = dataCharPie.findIndex(
        (a) => a.category == transaction.category
      );

      if (index !== -1) {
        dataCharPie[index].amount += transaction.amount;

        return;
      }

      dataCharPie.push({
        category: transaction.category,
        amount: transaction.amount,
        fill: mapColorPieChart[transaction.category],
      });
    });

    setPieChart(dataCharPie);
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
        <CardBarChart />

        <Card className="md:col-span-2">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl">Expenses by category</CardTitle>
            <CardDescription>
              Distribution of expenses by category.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer config={chartConfig}>
              <PieChart>
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="amount" hideLabel />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Pie
                  data={pieChart}
                  dataKey="amount"
                  labelLine={false}
                  label={({ payload, ...props }) => {
                    return (
                      <text
                        cx={props.cx}
                        cy={props.cy}
                        x={props.x}
                        y={props.y}
                        textAnchor={props.textAnchor}
                        dominantBaseline={props.dominantBaseline}
                        fill="hsla(var(--foreground))"
                      >
                        {payload.amount}
                      </text>
                    );
                  }}
                  nameKey="category"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>
    </Container>
  );
}

export default Home;
