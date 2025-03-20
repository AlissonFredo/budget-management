import { useState } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";

function ModalAddTransaction({ handleNewTransaction }) {
  const [isOpen, setIsOpen] = useState(false);

  const [transaction, setTransaction] = useState({
    nome: "",
    categoria: "",
    data: "",
    valor: "",
  });

  const submitTransaction = (event) => {
    event.preventDefault();

    const url =
      "https://sheet2api.com/v1/rtjzbZKQ2CY1/budget-management/P%C3%A1gina1";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...transaction,
        id: uuidv4(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        handleNewTransaction(data);

        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
                  <label htmlFor="nome">Nome:</label>
                  <input
                    value={transaction.nome}
                    type="text"
                    id="nome"
                    name="nome"
                    onChange={(e) =>
                      setTransaction({ ...transaction, nome: e.target.value })
                    }
                  />
                  <br />
                  <br />
                  <label htmlFor="categoria">Categoria:</label>
                  <input
                    value={transaction.categoria}
                    type="text"
                    id="categoria"
                    name="categoria"
                    onChange={(e) =>
                      setTransaction({
                        ...transaction,
                        categoria: e.target.value,
                      })
                    }
                  />
                  <br />
                  <br />
                  <label htmlFor="valor">Valor:</label>
                  <input
                    value={transaction.valor}
                    type="number"
                    id="valor"
                    name="valor"
                    onChange={(e) =>
                      setTransaction({ ...transaction, valor: e.target.value })
                    }
                  />
                  <br />
                  <br />
                  <label htmlFor="data">Data:</label>
                  <input
                    value={transaction.data}
                    type="date"
                    id="data"
                    name="data"
                    onChange={(e) =>
                      setTransaction({ ...transaction, data: e.target.value })
                    }
                  />
                  <br />
                  <br />
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
