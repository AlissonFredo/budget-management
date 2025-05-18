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
import Loading from "../Loading";
import { useTranslation } from "react-i18next";

function ExpensesTable() {
  const { t } = useTranslation();

  const categories = [
    { value: "Salary", label: t("modal_add_transaction.category1") },
    { value: "Freelance", label: t("modal_add_transaction.category2") },
    { value: "Investment", label: t("modal_add_transaction.category3") },
    { value: "Housing", label: t("modal_add_transaction.category4") },
    { value: "Food", label: t("modal_add_transaction.category5") },
    { value: "Utilities", label: t("modal_add_transaction.category6") },
    { value: "Dining", label: t("modal_add_transaction.category7") },
    { value: "Transportation", label: t("modal_add_transaction.category8") },
    { value: "Entertainment", label: t("modal_add_transaction.category9") },
    { value: "Shopping", label: t("modal_add_transaction.category10") },
    { value: "Health", label: t("modal_add_transaction.category11") },
    { value: "Other", label: t("modal_add_transaction.category12") },
  ];

  const getCategoryLabel = (category) => {
    return categories.find((value) => value.value == category).label;
  };

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

  const [isLoading, setIsLoading] = useState(false);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const fetchTransactions = async () => {
    setIsLoading(true);

    const transactions = await transactionsSearch("", "2025", "outgoing");

    formatTransactionsToSummary(transactions);

    setIsLoading(false);
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

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Card className="md:col-span-4">
      <CardHeader className="border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-2xl">{t("barchart.expenses")}</CardTitle>
            <CardDescription>{t("subtitle_table_expenses")}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Loading />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {mapColumns.map((column, key) => {
                  let newColumn = column;

                  if (newColumn == "category") {
                    newColumn = t("list.head3");
                  } else if (newColumn == "average") {
                    newColumn = t("average");
                  }

                  return (
                    <TableHead key={key}>
                      {capitalizeFirstLetter(newColumn)}
                    </TableHead>
                  );
                })}
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
                      {column != "category"
                        ? value[column]
                        : getCategoryLabel(value[column])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export default ExpensesTable;
