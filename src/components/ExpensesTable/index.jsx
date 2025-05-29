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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar, CalendarIcon } from "lucide-react";
import NotFaund from "../NotFaund";

function ExpensesTable() {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();
  const startYear = 2000;
  const endYear = currentYear + 10;

  const [selectedYears, setSelectedYears] = useState(currentYear);

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
    const year = startYear + i;
    return { value: year.toString(), label: year.toString() };
  }).reverse();

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

    const { transactions, error } = await transactionsSearch(
      "",
      selectedYears,
      "outgoing"
    );

    if (error) {
      alert(t(error));
    }

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
  }, [selectedYears]);

  return (
    <Card className="md:col-span-4">
      <CardHeader className="border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-2xl">{t("barchart.expenses")}</CardTitle>
            <CardDescription>{t("subtitle_table_expenses")}</CardDescription>
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
        {isLoading ? (
          <Loading />
        ) : summary.length == 0 ? (
          <NotFaund
            title={t("list.notfound_label")}
            description={t("notfound_description2")}
          />
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
