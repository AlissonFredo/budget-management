import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

function ListTransactions({ transactions, handleRemoveTransaction }) {
  const removeTransaction = async (id) => {
    try {
      const query_params = new URLSearchParams({
        limit: 1,
        query_type: "and",
        key: id,
      });

      const url =
        "https://sheet2api.com/v1/rtjzbZKQ2CY1/budget-management/page1?" +
        query_params;

      const response = await fetch(url, { method: "DELETE" });

      const data = await response.json();

      if (data === 500) {
        // throw an inconsistency warning toast
        console.log("Response remove transactions", data);
      }

      const filteredTransactions = transactions.filter((value) => {
        return value.key != id;
      });

      handleRemoveTransaction(filteredTransactions);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[250px]">Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.key} className="group">
              <TableCell className="font-medium">
                <div className="flex items-center space-x-3">
                  {transaction.type === "incoming" ? (
                    <Avatar className="h-8 w-8 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 flex justify-center items-center">
                      <ArrowUpCircle className="h-4 w-4" />
                    </Avatar>
                  ) : (
                    <Avatar className="h-8 w-8 bg-rose-100 text-rose-600 dark:bg-rose-900/20 flex justify-center items-center">
                      <ArrowDownCircle className="h-4 w-4" />
                    </Avatar>
                  )}

                  <span>{transaction.description}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(
                  `${transaction.day} ${transaction.month} ${transaction.year}`
                ).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>
                <Badge
                  className={`${
                    transaction.type === "incoming"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                      : "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300"
                  }`}
                >
                  {transaction.category}
                </Badge>
              </TableCell>
              <TableCell
                className={`text-right font-medium ${
                  transaction.type === "incoming"
                    ? "text-emerald-600"
                    : "text-rose-600"
                }`}
              >
                {transaction.type === "incoming" ? "+" : "-"}$
                {transaction.amount.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ListTransactions;
