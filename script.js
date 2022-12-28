/**
 * ! Getting data from the json file
 **/

getData();

async function getData() {
  const resp = await fetch("./data.json");
  const data = await resp.json();
  showData(data);
}

/**
 * ! Filling data in the chart container
 **/

const chart = document.querySelector(".chart-container");

function showData(data) {
  // clearing out loading text
  chart.innerHTML = "";
  // getting the weekday (for adding different color)
  let weekDay = new Date().getDay();
  data.forEach((x, index) => {
    // destructuring
    const { day, amount } = x;
    // creating a column
    const colEl = document.createElement("div");
    colEl.classList.add("col");
    // filling HTML for the column
    colEl.innerHTML = `<div class="stat text-white">$${amount}</div>
              <div class="bar" style="height: ${amount * 3.5}px"></div>
              <div class="day text-xs text-gray">${day}</div>`;
    // accessing .bar
    const barEl = colEl.querySelector(".bar");
    // adding special color on .bar if that day
    if (weekDay === index + 1) {
      barEl.classList.add("current");
    }
    // adding event listener on .bar
    // for showing
    barEl.addEventListener("mouseover", () => {
      let stat = barEl.previousElementSibling;
      stat.style.display = "block";
    });
    // for hiding
    barEl.addEventListener("mouseout", () => {
      let stat = barEl.previousElementSibling;
      stat.style.display = "none";
    });
    // adding the column in chart container
    chart.appendChild(colEl);
  });
}
