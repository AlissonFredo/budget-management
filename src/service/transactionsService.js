const URL = localStorage.getItem("sheet2apiLink");

export async function transactionsSearch(month = "", year = "", type = "") {
  try {
    let query = {
      limit: 999,
      query_type: "and",
    };

    if (month != "") query = { ...query, month: month };
    if (year != "") query = { ...query, year: year };
    if (type != "") query = { ...query, type: type };

    query = new URLSearchParams(query);

    console.log("inicio da requisição");
    const response = await fetch(`${URL}/page1?${query}`);
    console.log("fim da requisição", response);

    if (response.status == 400) {
      console.log("solicitação inválida");
    } else if (response.status == 402) {
      console.log(
        "Pagamento necessário, atualize seu plano de conta para continuar"
      );
    } else if (response.status == 404) {
      console.log("não encontrado");
    } else if (response.status == 429) {
      console.log(
        "Acima do limite mensal de solicitações de API, atualize seu plano de conta para continuar"
      );
    } else if (response.status == 200) {
      const data = await response.json();

      return data;
    }

    return [];
  } catch (error) {
    console.error("Error Transactions Search:", error);
  }
}

export async function transactionSubmit(values) {
  try {
    if (values.key == "") return;
    if (values.description == "") return;
    if (values.category == "") return;
    if (values.amount == "") return;
    if (values.month == "") return;
    if (values.year == "") return;
    if (values.type == "") return;

    const response = await fetch(`${URL}/page1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: values.key,
        description: values.description,
        category: values.category,
        amount: parseInt(values.amount, 10),
        day: values.day,
        month: values.month,
        year: values.year,
        type: values.type,
      }),
    });

    if (response.status == 400) {
      console.log("solicitação inválida");
    } else if (response.status == 402) {
      console.log(
        "Pagamento necessário, atualize seu plano de conta para continuar"
      );
    } else if (response.status == 404) {
      console.log("não encontrado");
    } else if (response.status == 429) {
      console.log(
        "Acima do limite mensal de solicitações de API, atualize seu plano de conta para continuar"
      );
    } else if (response.status == 201) {
      const data = await response.json();

      return data;
    }

    return false;
  } catch (error) {
    console.error("Error Transaction Submit:", error);
  }
}
