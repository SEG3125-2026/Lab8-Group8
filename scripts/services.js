// Services shown on the home menu 
//service + price
var services = {
  screenRepair: {
    key: "screenRepair",
    label: "Screen Repair",
    price: 80,
    desc: "Full screen replacement with genuine parts and display calibration. (~1 hour)"
  },
  batteryReplacement: {
    key: "batteryReplacement",
    label: "Battery Replacement",
    price: 120,
    desc: "OEM battery swap with capacity test. (~45 minutes)"
  },
  chargingPortRepair: {
    key: "chargingPortRepair",
    label: "Charging Port Repair",
    price: 90,
    desc: "Charging port replacement with functionality test. (~1 hour)"
  },
  waterDamageRepair: {
    key: "waterDamageRepair",
    label: "Water Damage Repair",
    price: 120,
    desc: "Full internal dry-out, corrosion treatment, and component testing. (~1 day)"
  }
};

// Staff + which services they can do (filtering)

var staff = [
  {
    name: "Sherman",
    role: "Part-Time Technician",
    skills: { screenRepair: true, batteryReplacement: false, chargingPortRepair: true, waterDamageRepair: false },
    availableDays: [1, 2, 6] // Monday, Tuesday, Saturday
  },
  {
    name: "Shehzad",
    role: "Part-Time Technician",
    skills: { screenRepair: false, batteryReplacement: false, chargingPortRepair: true, waterDamageRepair: true },
    availableDays: [3, 4, 5] // Wednesday, Thursday, Friday
  },
  {
    name: "Pirana",
    role: "Lead Technician",
    skills: { screenRepair: true, batteryReplacement: true, chargingPortRepair: true, waterDamageRepair: true },
    availableDays: [1, 2, 3, 4, 5, 6] // Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
  }
];