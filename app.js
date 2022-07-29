const cur1 = document.getElementById("cur1");
const cur2 = document.getElementById("cur2");
const submit = document.getElementById("submit");
const showRate = document.getElementById("showRate");
const swapVal = document.getElementById("swapVal");

// show currency
const AddCurrency = () => {
  async function getData() {
    const response = await fetch(`https://api.exchangerate.host/symbols`);
    const curlist = await response.json();

    const currencyList = Object.values(curlist.symbols);

    for (const x of currencyList) {
      let option1 = document.createElement("option");
      let option2 = document.createElement("option");
      option1.innerHTML = `${x.code} - ${x.description}`;
      option1.setAttribute("value", `${x.code}`);
      option2.innerHTML = `${x.code} - ${x.description}`;
      option2.setAttribute("value", `${x.code}`);
      cur1.appendChild(option1);
      cur2.appendChild(option2);
    }

    return curlist;
  }
  getData().catch((err) => console.log("errors:", err.message));
};

//clear screen
const clearScreen = () => {
  while (showRate.hasChildNodes()) {
    showRate.removeChild(showRate.firstChild);
  }
};

// find rate
submit.addEventListener("click", (e) => {
  e.preventDefault();

  const showCountry = document.createElement("div");
  const curFrom = document.createElement("div");
  const curTo = document.createElement("div");
  const curRate = document.createElement("div");
  clearScreen(curFrom, curTo, curRate);
  showRate.appendChild(showCountry);
  showRate.appendChild(curFrom);
  showRate.appendChild(curTo);
  showRate.appendChild(curRate);

  async function getData() {
    const response = await fetch(
      `https://api.exchangerate.host/convert?from=${cur1.value}&to=${cur2.value}`
    );
    const data = await response.json();
    showCountry.classList.add("display-5");
    showCountry.classList.add("text-warning");
    showCountry.innerHTML = `Rate of ${
      JSON.stringify(data.query.from).split('"')[1]
    } to ${JSON.stringify(data.query.to).split('"')[1]} is ${JSON.stringify(
      data.result
    )}`;
    return data;
  }
  getData()
    // .then((data) => console.log(data))
    .catch((err) => console.log("errors:", err.message));
});

// load

AddCurrency();

function SwapTheValue() {
  let temp;
  temp = cur1.value;
  cur1.value = cur2.value;
  cur2.value = temp;
}

swapVal.addEventListener("click", () => {
  SwapTheValue();
});
