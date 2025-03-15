function App() {
  var query_params = new URLSearchParams({
    limit: 10,
    // query_type: "and",
    // nome: "example value",
    // categoria: "example value",
    // data: "example value",
    // valor: "example value",
  });
  var url =
    "https://sheet2api.com/v1/rtjzbZKQ2CY1/budget-management/P%C3%A1gina1?" +
    query_params;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return (
    <>
      <h1>Budget Management</h1>
    </>
  );
}

export default App;
