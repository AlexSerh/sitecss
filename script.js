import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

document.addEventListener('DOMContentLoaded', () => {
  window.toggleForm = function toggleForm() {
    const form = document.getElementById("contactForm");
    if (form) {
      form.style.display = form.style.display === "none" ? "block" : "none";
    }
  };

  window.searchImages = function searchImages() {
    const input = document.getElementById("searchInput")?.value.toLowerCase();
    const headings = document.querySelectorAll("#gallery h2");

    for (let h2 of headings) {
      if (h2.textContent.toLowerCase().includes(input)) {
        h2.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      }
    }
  };

  const supabaseUrl = 'https://cptowysiqzrcmhprsgqu.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwdG93eXNpcXpyY21ocHJzZ3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3Nzg1NDUsImV4cCI6MjA2MTM1NDU0NX0.-RKQIMAIiOl_bqSzGUpMcZebGa89NUZ6xPu9P2p-DbA';
  const supabase = createClient(supabaseUrl, supabaseKey);

  function addCityToTable(city) {
    const tableBody = document.querySelector("#citiesTable tbody");
    if (!tableBody) return;

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${city.name}</td>
      <td>${city.population}</td>
      <td>${city.attractions}</td>
    `;
    tableBody.appendChild(newRow);
  }

  async function loadCities() {
    const { data, error } = await supabase.from('cities').select('*');
    if (error) {
      console.error('Помилка завантаження міст:', error.message);
      return;
    }
    data.forEach(addCityToTable);
  }

  const openModalButton = document.getElementById('openModalButton');
  const closeModalButton = document.getElementById('closeModalButton');
  const cityModal = document.getElementById('cityModal');
  const modalOverlay = document.getElementById('modalOverlay');

  function openModal() {
    if (cityModal && modalOverlay) {
      cityModal.style.display = 'block';
      modalOverlay.style.display = 'block';
    }
  }

  function closeModal() {
    if (cityModal && modalOverlay) {
      cityModal.style.display = 'none';
      modalOverlay.style.display = 'none';
    }
  }

  openModalButton?.addEventListener('click', openModal);
  closeModalButton?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', closeModal);

  const cityForm = document.getElementById('cityForm');
  cityForm?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const population = document.getElementById('population')?.value.trim();
    const attractions = document.getElementById('attractions')?.value.trim();

    if (!name || !population || !attractions) {
      alert('Будь ласка, заповніть всі поля.');
      return;
    }

    const { data, error } = await supabase
      .from('cities')
      .insert([{ name, population, attractions }])
      .select();

    if (error) {
      alert('Помилка додавання міста: ' + error.message);
      return;
    }

    if (data?.length > 0) {
      addCityToTable(data[0]);
      cityForm.reset();
      closeModal();
      alert('Місто додано!');
    }
  });

  loadCities();
});