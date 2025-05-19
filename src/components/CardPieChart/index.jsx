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
import Loading from "../Loading";
import { useTranslation } from "react-i18next";

function CardPieChart({ transactions, isLoading }) {
  const { t } = useTranslation();

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
      label: t("list.head4"),
    },
    Salary: {
      label: t("modal_add_transaction.category1"),
      color: "#e0e0e0",
    },
    Freelance: {
      label: t("modal_add_transaction.category2"),
      color: "#f0b400",
    },
    Investment: {
      label: t("modal_add_transaction.category3"),
      color: "#ff6b6b",
    },
    Housing: {
      label: t("modal_add_transaction.category4"),
      color: "#4d8aff",
    },
    Food: {
      label: t("modal_add_transaction.category5"),
      color: "#7d5fff",
    },
    Utilities: {
      label: t("modal_add_transaction.category6"),
      color: "#a156f2",
    },
    Dining: {
      label: t("modal_add_transaction.category7"),
      color: "#3880ff",
    },
    Transportation: {
      label: t("modal_add_transaction.category8"),
      color: "#4f46e5",
    },
    Entertainment: {
      label: t("modal_add_transaction.category9"),
      color: "#ffb347",
    },
    Shopping: {
      label: t("modal_add_transaction.category10"),
      color: "#ff6f61",
    },
    Health: {
      label: t("modal_add_transaction.category11"),
      color: "#226f54",
    },
    Other: {
      label: t("modal_add_transaction.category12"),
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
        <CardTitle className="text-2xl">{t("pieChart.title")}</CardTitle>
        <CardDescription>{t("pieChart.description")}</CardDescription>
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
