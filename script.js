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