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

function CardBarChart() {
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
