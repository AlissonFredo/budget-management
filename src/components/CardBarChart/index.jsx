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
import { transactionsSearch } from "@/service/transactionsService";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CalendarIcon } from "lucide-react";

function CardBarChart() {
  const currentYear = new Date().getFullYear();
  const startYear = 2000;
  const endYear = currentYear + 10;

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
    const year = startYear + i;
    return { value: year.toString(), label: year.toString() };
  }).reverse();

  const [selectedYears, setSelectedYears] = useState(currentYear);

  const [chartData, setChartData] = useState([
    { month: "January", income: 0, outgoing: 0 },
    { month: "February", income: 0, outgoing: 0 },
    { month: "March", income: 0, outgoing: 0 },
    { month: "April", income: 0, outgoing: 0 },
    { month: "May", income: 0, outgoing: 0 },
    { month: "June", income: 0, outgoing: 0 },
    { month: "July", income: 0, outgoing: 0 },
    { month: "August", income: 0, outgoing: 0 },
    { month: "September", income: 0, outgoing: 0 },
    { month: "October", income: 0, outgoing: 0 },
    { month: "November", income: 0, outgoing: 0 },
    { month: "December", income: 0, outgoing: 0 },
  ]);

  useEffect(() => {
    fetchTransactions();
  }, [selectedYears]);

  const fetchTransactions = async () => {
    const result = await transactionsSearch("", selectedYears);

    agregateTransactions(result);
  };

  const agregateTransactions = (values) => {
    const monthMap = {
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      august: "August",
      september: "September",
      october: "October",
      november: "November",
      december: "December",
    };

    const aggregatedData = {};

    values.forEach((transaction) => {
      const monthCapitalized = monthMap[transaction.month];

      if (!aggregatedData[monthCapitalized]) {
        aggregatedData[monthCapitalized] = { income: 0, outgoing: 0 };
      }

      if (transaction.type === "incoming") {
        aggregatedData[monthCapitalized].income += transaction.amount;
      } else if (transaction.type === "outgoing") {
        aggregatedData[monthCapitalized].outgoing += transaction.amount;
      }
    });

    const updatedChartData = chartData.map((data) => {
      const aggregated = aggregatedData[data.month] || {
        income: 0,
        outgoing: 0,
      };

      return {
        ...data,
        income: aggregated.income,
        outgoing: aggregated.outgoing,
      };
    });

    setChartData(updatedChartData);
  };

  const chartConfig = {
    income: {
      label: "Income",
      color: "hsl(var(--chart-6))",
    },
    outgoing: {
      label: "Expenses",
      color: "hsl(var(--chart-7))",
    },
  };

  return (
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
          <div>
            <Select
              value={selectedYears.toString()}
              onValueChange={(year) => setSelectedYears(year)}
            >
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select year" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
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
            <Bar dataKey="outgoing" fill="var(--color-outgoing)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default CardBarChart;
