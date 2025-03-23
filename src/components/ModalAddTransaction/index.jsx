import { useState } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import Input from "../Input";

function ModalAddTransaction({ handleNewTransaction }) {
  const [isOpen, setIsOpen] = useState(false);

  const [transaction, setTransaction] = useState({
    description: "",
    category: "",
    date: "",
    amount: "",
    type: "",
  });

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
          amount: transaction.amount,
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
      <button
        onClick={() => setIsOpen(true)}
        className="text-start p-3 bg-blue-400 text-white text-lg font-semibold cursor-pointer"
      >
        Add Transaction
      </button>

      {isOpen &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white shadow-lg w-100">
              <header className="text-start p-2 bg-blue-400">
                <h1 className="text-white text-md font-semibold">
                  Add Transaction
                </h1>
              </header>

              <div className="p-4">
                <form>
                  <Input
                    id="description"
                    label="Description:"
                    value={transaction.description}
                    type="text"
                    name="description"
                    onChange={(e) =>
                      setTransaction({
                        ...transaction,
                        description: e.target.value,
                      })
                    }
                  />

                  <Input
                    id="category"
                    label="Category:"
                    value={transaction.category}
                    type="text"
                    name="category"
                    onChange={(e) =>
                      setTransaction({
                        ...transaction,
                        category: e.target.value,
                      })
                    }
                  />

                  <Input
                    id="amount"
                    label="Amount:"
                    value={transaction.amount}
                    type="number"
                    name="amount"
                    onChange={(e) =>
                      setTransaction({
                        ...transaction,
                        amount: e.target.value,
                      })
                    }
                  />

                  <Input
                    id="date"
                    label="Date:"
                    value={transaction.date}
                    type="date"
                    name="date"
                    onChange={(e) =>
                      setTransaction({
                        ...transaction,
                        date: e.target.value,
                      })
                    }
                  />
                </form>

                <div className="text-end">
                  <button
                    className="p-3 bg-blue-400 text-white text-sm font-semibold cursor-pointer mr-3"
                    onClick={submitTransaction}
                  >
                    Submit
                  </button>

                  <button
                    className="p-3 bg-gray-400 text-white text-sm font-semibold cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default ModalAddTransaction;
