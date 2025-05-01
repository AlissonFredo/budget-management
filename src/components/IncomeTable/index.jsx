import { transactionsSearch } from "@/service/transactionsService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";

function IncomeTable() {
  const mapColumns = [
    "category",
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
    "total",
    "average",
  ];

  const [summary, setSummary] = useState([]);

  const fetchTransactions = async () => {
    const transactions = await transactionsSearch("", "2025", "incoming");

    formatTransactionsToSummary(transactions);
  };

  const formatTransactionsToSummary = (transactions) => {
    const categories = [
      ...new Set(transactions.map((transaction) => transaction.category)),
    ];

    const data = [];

    categories.forEach((category) => {
      const obj = {};

      mapColumns.forEach((column) => {
        if (column == "category") {
          obj[column] = category;
        } else {
          obj[column] = 0;
        }
      });

      data.push(obj);
    });

    transactions.forEach((transaction) => {
      const month = transaction.month.substr(0, 3);

      data.forEach((value) => {
        if (value["category"] == transaction.category) {
          value[month] += transaction.amount;
          value["total"] += transaction.amount;

          const keysMonths = Object.keys(value).filter(
            (key) => key !== "total" && key !== "average" && key !== "category"
          );

          const monthsFilled = keysMonths.filter(
            (key) => value[key] != 0
          ).length;

          value["average"] = value["total"] / monthsFilled;
        }
      });
    });

    setSummary(data);
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Card className="md:col-span-4">
      <CardHeader className="border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-2xl">Incomes</CardTitle>
            <CardDescription>
              Income summary for the year, organized by category
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {mapColumns.map((column) => (
                <TableHead>{capitalizeFirstLetter(column)}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {summary.map((value, keyValue) => (
              <TableRow key={keyValue} className="group">
                {mapColumns.map((column, keyColumn) => (
                  <TableCell
                    key={keyColumn}
                    className="text-sm text-muted-foreground"
                  >
                    {value[column]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default IncomeTable;
