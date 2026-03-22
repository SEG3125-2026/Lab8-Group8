const STORAGE_KEY = "repairBooking";

const fallbackServices = [
  {
    key: "screenRepair",
    name: "Screen Repair",
    price: 100,
    time: "1 hour",
    image: "images/images.jpeg"
  },
  {
    key: "batteryReplacement",
    name: "Battery Replacement",
    price: 120,
    time: "45 minutes",
    image: "images/v4-460px-Fix-a-Bike-Tire-Step-2.jpg"
  },
  {
    key: "chargingPortRepair",
    name: "Charging Port Repair",
    price: 90,
    time: "1 hour",
    image: "images/12.jpeg"
  },
  {
    key: "waterDamageRepair",
    name: "Water Damage Repair",
    price: 80,
    time: "30 minutes",
    image: "images/water-damage-repair.jpg"
  }
];

const fallbackTechnicians = [
  {
    key: "michaelPhillips",
    name: "Michael Phillips",
    available: "Monday, Wednesday, Friday"
  },
  {
    key: "rasheedWallace",
    name: "Rasheed Wallace",
    available: "Tuesday, Thursday, Friday"
  },
  {
    key: "mikeBrown",
    name: "Mike Brown",
    available: "Tuesday, Wednesday, Thursday"
  }
];

const serviceData = Array.isArray(window.services) ? window.services : fallbackServices;
const technicianData = Array.isArray(window.technicians) ? window.technicians : fallbackTechnicians;

function getStoredRepair() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
}

function saveStoredRepair(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function clearStoredRepair() {
  localStorage.removeItem(STORAGE_KEY);
}

function findServiceByKey(key) {
  return serviceData.find(service => service.key === key);
}

function findTechnicianByKey(key) {
  return technicianData.find(tech => tech.key === key);
}

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function goToServices(selectedKey = "") {
  if (selectedKey) {
    const current = getStoredRepair();
    current.serviceKey = selectedKey;
    saveStoredRepair(current);
    window.location.href = `services.html?service=${encodeURIComponent(selectedKey)}`;
  } else {
    window.location.href = "services.html";
  }
}

function selectService(serviceKey) {
  const current = getStoredRepair();
  current.serviceKey = serviceKey;
  saveStoredRepair(current);
  window.location.href = "technicians.html";
}

function selectTechnician(technicianKey) {
  const current = getStoredRepair();
  current.technicianKey = technicianKey;
  saveStoredRepair(current);
  window.location.href = "bookrepair.html";
}

function renderServicesPage() {
  const container = document.getElementById("servicesContainer");
  if (!container) return;

  const queryServiceKey = getQueryParam("service");
  if (queryServiceKey) {
    const current = getStoredRepair();
    current.serviceKey = queryServiceKey;
    saveStoredRepair(current);
  }

  container.innerHTML = "";

  serviceData.forEach(service => {
    const card = document.createElement("div");
    card.className = "mock-card service-card";

    card.innerHTML = `
      <h2>${service.name}:</h2>
      <p>Price: $${service.price}</p>
      <p>Time: ${service.time}</p>
      <button type="button">Select</button>
    `;

    const button = card.querySelector("button");
    button.addEventListener("click", function () {
      selectService(service.key);
    });

    container.appendChild(card);
  });
}

function renderTechniciansPage() {
  const container = document.getElementById("techniciansContainer");
  if (!container) return;

  container.innerHTML = "";

  technicianData.forEach(tech => {
    const card = document.createElement("div");
    card.className = "mock-card technician-card";

    card.innerHTML = `
      <h2>${tech.name}:</h2>
      <p>Available On:</p>
      <p>${tech.available}</p>
      <button type="button">Select</button>
    `;

    const button = card.querySelector("button");
    button.addEventListener("click", function () {
      selectTechnician(tech.key);
    });

    container.appendChild(card);
  });
}

function setBookRepairSummary() {
  const repairType = document.getElementById("selectedRepairType");
  const technician = document.getElementById("selectedTechnician");

  if (!repairType || !technician) return;

  const current = getStoredRepair();
  const selectedService = findServiceByKey(current.serviceKey);
  const selectedTech = findTechnicianByKey(current.technicianKey);

  repairType.textContent = selectedService ? selectedService.name : "Not selected";
  technician.textContent = selectedTech ? selectedTech.name : "Not selected";
}

function formatDateForDisplay(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString + "T00:00:00");
  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function submitRepairForm(event) {
  event.preventDefault();

  const current = getStoredRepair();

  const customerName = document.getElementById("customerName");
  const customerEmail = document.getElementById("customerEmail");
  const customerPhone = document.getElementById("customerPhone");
  const phoneBrand = document.getElementById("phoneBrand");
  const phoneModel = document.getElementById("phoneModel");
  const dropOffDate = document.getElementById("dropOffDate");
  const issueDescription = document.getElementById("issueDescription");

  current.customerName = customerName ? customerName.value.trim() : "";
  current.customerEmail = customerEmail ? customerEmail.value.trim() : "";
  current.customerPhone = customerPhone ? customerPhone.value.trim() : "";
  current.phoneBrand = phoneBrand ? phoneBrand.value.trim() : "";
  current.phoneModel = phoneModel ? phoneModel.value.trim() : "";
  current.dropOffDate = dropOffDate ? dropOffDate.value : "";
  current.issueDescription = issueDescription ? issueDescription.value.trim() : "";

  saveStoredRepair(current);
  window.location.href = "payment.html";
}

function renderPaymentSummary() {
  const summaryBox = document.getElementById("paymentSummary");
  if (!summaryBox) return;

  const current = getStoredRepair();
  const selectedService = findServiceByKey(current.serviceKey);
  const selectedTech = findTechnicianByKey(current.technicianKey);

  const basePrice = selectedService ? selectedService.price : 0;
  const totalPrice = Math.round(basePrice * 1.13);

  summaryBox.innerHTML = `
    <h2>Repair Summary:</h2>
    <p>Phone Brand: ${current.phoneBrand || ""}</p>
    <p>Phone Model: ${current.phoneModel || ""}</p>
    <p>Technician: ${selectedTech ? selectedTech.name : ""}</p>
    <p>Repair: ${selectedService ? selectedService.name : ""}</p>
    <p>Date: ${formatDateForDisplay(current.dropOffDate) || ""}</p>
    <br>
    <p>Price: $${basePrice}</p>
    <p>Total Price: $${totalPrice}</p>
  `;
}

function confirmPayment(event) {
  event.preventDefault();
  alert("Repair booking and payment confirmed.");
  clearStoredRepair();
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function () {
  renderServicesPage();
  renderTechniciansPage();
  setBookRepairSummary();
  renderPaymentSummary();

  const repairForm = document.getElementById("repairForm");
  if (repairForm) {
    repairForm.addEventListener("submit", submitRepairForm);
  }

  const paymentForm = document.getElementById("paymentForm");
  if (paymentForm) {
    paymentForm.addEventListener("submit", confirmPayment);
  }

  const previewLinks = document.querySelectorAll("[data-service-key]");
  previewLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      goToServices(this.dataset.serviceKey);
    });
  });

  const bookRepairLink = document.getElementById("bookRepairHomeLink");
  if (bookRepairLink) {
    bookRepairLink.addEventListener("click", function (event) {
      event.preventDefault();
      goToServices();
    });
  }
});