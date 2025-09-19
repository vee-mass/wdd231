const apiKey = "007f5078e464cb09d792a0b512617542";
const city = "Pretoria";
const units = "metric";

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
    const response = await fetch(url);
    const data = await response.json();

    document.getElementById("current-temp").textContent = `Temperature: ${data.list[0].main.temp} °C`;
    document.getElementById("current-desc").textContent = `Condition: ${data.list[0].weather[0].description}`;

    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "<h3>3-Day Forecast</h3>";
    const filtered = data.list.filter(f => f.dt_txt.includes("12:00:00")).slice(0, 3);
    filtered.forEach(day => {
      const date = new Date(day.dt_txt).toLocaleDateString();
      forecastDiv.innerHTML += `<p>${date}: ${day.main.temp} °C, ${day.weather[0].description}</p>`;
    });
  } catch (error) {
    console.error("Weather fetch error:", error);
  }
}

getWeather();
