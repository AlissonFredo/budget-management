function ListTransactions({ transactions = [], handleRemoveTransaction }) {
  const removeTransaction = (id) => {
    const query_params = new URLSearchParams({
      limit: 1,
      query_type: "and",
      id: id,
    });
    const url =
      "https://sheet2api.com/v1/rtjzbZKQ2CY1/budget-management/P%C3%A1gina1?" +
      query_params;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then((data) => {
        const filteredTransactions = transactions.filter((value) => {
          return value.id != id;
        });

        handleRemoveTransaction(filteredTransactions);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <ul>
        {transactions.length !== 0 ? (
          transactions.map((transaction, key) => (
            <li key={key} className="flex">
              <div className="w-15 flex justify-center items-center">
                <div className="size-15 rounded-full bg-gray-400"></div>
              </div>
              <div className="w-1/1 flex justify-between pl-2 py-2">
                <div>
                  <h1 className="text-lg font-semibold">{transaction.nome}</h1>
                  <h1 className="text-lg font-semibold">
                    {transaction.categoria}
                  </h1>
                </div>
                <div className="grid grid-cols-2">
                  <div className="w-20 flex items-center mr-3">
                    <h1 className="text-lg font-semibold">
                      R$ {transaction.valor}
                    </h1>
                  </div>
                  <div className="flex justify-end items-center">
                    <button
                      onClick={() => removeTransaction(transaction.id)}
                      className="text-start p-3 bg-red-400 text-white text-sm font-semibold cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}

export default ListTransactions;
