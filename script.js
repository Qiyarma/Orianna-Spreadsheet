let champions = [];

const searchInput = document.querySelector("input");
const infoBox = document.getElementById("champion-info");


fetch("champions.json")
  .then(response => response.json())
  .then(data => {
    champions = data;
  })
  .catch(error => {
    console.error("Fehler beim Laden:", error);
    infoBox.innerHTML = "<h2>Fehler beim Laden der Daten</h2>";
  });


searchInput.addEventListener("input", () => {

  const search = searchInput.value.toLowerCase();

  const champion = champions.find(
    champ => champ.enemy.toLowerCase() === search
  );


  if (champion) {

    infoBox.innerHTML = `
      <h2>${champion.enemy}</h2>

      <p><strong>Typ:</strong> ${champion.type}</p>

      <p><strong>Schwierigkeit:</strong> ${champion.difficulty}</p>

      <p><strong>Stärken:</strong><br>
      ${champion.strengths}</p>

      <p><strong>Lane Phase:</strong><br>
      ${champion.lanePhase}</p>

      <p><strong>Trading:</strong><br>
      ${champion.trading}</p>

      <p><strong>Achtung:</strong></p>
      <ul>
        ${champion.attention.map(item => `<li>${item}</li>`).join("")}
      </ul>

      <p><strong>Gute Items:</strong></p>
      <ul>
        ${champion.goodItems.map(item => `<li>${item}</li>`).join("")}
      </ul>
    `;

  } else if (search.length > 0) {

    infoBox.innerHTML = `
      <h2>Nicht gefunden</h2>
      <p>Kein Champion mit diesem Namen gefunden.</p>
    `;

  } else {

    infoBox.innerHTML = `
      <h2>Willkommen!</h2>
      <p>Suche einen Champion, um Tipps zu sehen.</p>
    `;
  }

});