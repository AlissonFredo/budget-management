import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownCircle, ArrowUpCircle, Calendar, Trash2 } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { useState } from "react";

function ListTransactions({
  transactions,
  handleRemoveTransaction,
  isLoading,
}) {
  if (isLoading) {
    return <TransactionLoading />;
  } else if (transactions.length === 0) {
    return <TransactionsNotFaund />;
  } else {
    return (
      <TableTransaction
        transactions={transactions}
        handleRemoveTransaction={handleRemoveTransaction}
      />
    );
  }
}

export default ListTransactions;

function TableTransaction({ transactions, handleRemoveTransaction }) {
  const [isLoading, setIsLoading] = useState(false);

  const [idRemove, setIdRemove] = useState(null);

  const getCategoryColor = (category) => {
    const colors = {
      Salary:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
      Freelance:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300",
      Investment:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
      Housing:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
      Food: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      Utilities:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
      Dining:
        "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300",
      Transportation:
        "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-300",
    };
    return (
      colors[category] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    );
  };

  const removeTransaction = async (id) => {
    try {
      setIdRemove(id);
      setIsLoading(true);
      const query_params = new URLSearchParams({
        limit: 1,
        query_type: "and",
        key: id,
      });

      const url =
        "https://sheet2api.com/v1/rtjzbZKQ2CY1/budget-management/page1?" +
        query_params;

      const response = await fetch(url, { method: "DELETE" });

      if (response.status === 500) {
        console.log("Response remove transactions", response);
      }

      const filteredTransactions = transactions.filter((value) => {
        return value.key != id;
      });

      handleRemoveTransaction(filteredTransactions);
      setIsLoading(false);
      setIdRemove(null);
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
            <TableHead className="w-[80px]">Actions</TableHead>
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
                <Badge className={`${getCategoryColor(transaction.category)}`}>
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
              <TableCell>
                {isLoading && transaction.key == idRemove ? (
                  <div className="text-lg font-medium mr-2 w-4 h-4 border-4 border-muted-foreground border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeTransaction(transaction.key)}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    <span className="sr-only">Delete</span>
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function TransactionsNotFaund() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">No transactions found</h3>
      <p className="text-sm text-muted-foreground text-center mt-1">
        Try selecting a different month or adding new transactions.
      </p>
    </div>
  );
}

function TransactionLoading() {
  return (
    <div className="flex justify-center items-center py-12 px-4 text-muted-foreground">
      <div className="text-lg font-medium mr-2 w-4 h-4 border-4 border-muted-foreground border-t-transparent rounded-full animate-spin"></div>
      <span>Loading...</span>
    </div>
  );
}
