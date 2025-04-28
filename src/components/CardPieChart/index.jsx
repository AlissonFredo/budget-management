import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

function CardPieChart({ transactions, isLoading }) {
  const [pieChart, setPieChart] = useState([]);

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

  useEffect(() => {
    aggregateOutgoingByCategory(transactions);
  }, [transactions]);

  return (
    <Card className="md:col-span-2">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl">Expenses by category</CardTitle>
        <CardDescription>Distribution of expenses by category.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isLoading ? (
          <Loading />
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}

export default CardPieChart;

function Loading() {
  return (
    <div className="flex justify-center items-center py-12 px-4 text-muted-foreground">
      <div className="text-lg font-medium mr-2 w-4 h-4 border-4 border-muted-foreground border-t-transparent rounded-full animate-spin"></div>
      <span>Loading...</span>
    </div>
  );
}
