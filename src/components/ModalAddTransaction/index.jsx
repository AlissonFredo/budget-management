import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { CalendarIcon, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

function ModalAddTransaction({ handleNewTransaction }) {
  const [isOpen, setIsOpen] = useState(false);

  const [transaction, setTransaction] = useState({
    description: "",
    category: "",
    date: "",
    amount: "",
    type: "incoming",
  });

  const categories = [
    { value: "Salary", label: "Salary" },
    { value: "Freelance", label: "Freelance" },
    { value: "Investment", label: "Investment" },
    { value: "Housing", label: "Housing" },
    { value: "Food", label: "Food" },
    { value: "Utilities", label: "Utilities" },
    { value: "Dining", label: "Dining" },
    { value: "Transportation", label: "Transportation" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Shopping", label: "Shopping" },
    { value: "Health", label: "Health" },
    { value: "Other", label: "Other" },
  ];

  const submitTransaction = async (event) => {
    try {
      event.preventDefault();

      const url =
        "https://sheet2api.com/v1/rtjzbZKQ2CY1/budget-management/page1";

      let [year, month, day] = transaction.date.split("-");
      const date = new Date(year, month - 1, day);
      month = date.toLocaleString("en-US", { month: "long" }).toLowerCase();

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: uuidv4(),
          description: transaction.description,
          category: transaction.category,
          amount: parseInt(transaction.amount, 10),
          day: day,
          month: month,
          year: year,
          type: transaction.type,
        }),
      });

      const data = await response.json();
      console.log("Response create transactions", data);

      if (data != 500) {
        handleNewTransaction(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <PlusCircle className="h-4 w-4" />
        Add Transaction
      </Button>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsOpen(open);
          }
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <div>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Add New Transaction
              </DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new transaction to your
                budget.
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-6 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="Enter transaction description"
                      value={transaction.description}
                      onChange={(e) =>
                        setTransaction({
                          ...transaction,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={transaction.category}
                      onValueChange={(e) =>
                        setTransaction({
                          ...transaction,
                          category: e,
                        })
                      }
                      required
                    >
                      <SelectTrigger id="category" className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={transaction.amount}
                      onChange={(e) =>
                        setTransaction({
                          ...transaction,
                          amount: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Transaction Type</Label>
                    <RadioGroup
                      value={transaction.type}
                      onValueChange={(e) =>
                        setTransaction({
                          ...transaction,
                          type: e,
                        })
                      }
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="incoming" id="incoming" />
                        <Label
                          htmlFor="incoming"
                          className="font-normal cursor-pointer"
                        >
                          Incoming
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="outgoing" id="outgoing" />
                        <Label
                          htmlFor="outgoing"
                          className="font-normal cursor-pointer"
                        >
                          Outgoing
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        required
                        type="date"
                        id="date"
                        value={transaction.date || ""}
                        onChange={(e) =>
                          setTransaction({
                            ...transaction,
                            date: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-3 py-2 border border-input bg-background rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={submitTransaction}>Add Transaction</Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalAddTransaction;
