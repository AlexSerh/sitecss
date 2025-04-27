function toggleForm() {
  const form = document.getElementById("contactForm");
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

function searchImages() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const headings = document.querySelectorAll("#gallery h2");

  for (let h2 of headings) {
    if (h2.textContent.toLowerCase().includes(input)) {
      h2.scrollIntoView({ behavior: "smooth", block: "start" });
      break;
    }
  }
}


import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://cptowysiqzrcmhprsgqu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwdG93eXNpcXpyY21ocHJzZ3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3Nzg1NDUsImV4cCI6MjA2MTM1NDU0NX0.-RKQIMAIiOl_bqSzGUpMcZebGa89NUZ6xPu9P2p-DbA';

const supabase = createClient(supabaseUrl, supabaseKey);

function addCityToTable(city) {
    const tableBody = document.querySelector("#citiesTable tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${city.name}</td>
        <td>${city.population}</td>
        <td>${city.attractions}</td>
    `;
    tableBody.appendChild(newRow);
}

async function loadCities() {
    const { data, error } = await supabase
        .from('cities')
        .select('*');

    if (error) {
        console.error('Помилка завантаження міст:', error.message);
        return;
    }

    data.forEach(city => {
        addCityToTable(city);
    });
}

document.getElementById('cityForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const population = document.getElementById('population').value.trim();
    const attractions = document.getElementById('attractions').value.trim();

    if (!name || !population || !attractions) {
        alert('Будь ласка, заповніть всі поля.');
        return;
    }

    const { data, error } = await supabase
        .from('cities')
        .insert([{ name, population, attractions }]);

    if (error) {
        alert('Помилка додавання міста: ' + error.message);
    } else {
        alert('Місто додано!');
        addCityToTable(data[0]);
        document.getElementById('cityForm').reset();
    }
});

loadCities();
