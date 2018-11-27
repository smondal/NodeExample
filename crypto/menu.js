function logMapElements(value, key, map) {
  console.log(`m[${key}] = ${value}`);
}
const menuStructure = [
  { name: "Dashboard", fragment: "" },
  { name: "Angebote", fragment: "contract-offers" },
  { name: "Verträge", fragment: "contracts" },
  { name: "Mitarbeiter", fragment: "users" },
  { name: "Workshops", fragment: "workshops" },
  { name: "Versicherer", fragment: "insurance-companies", subMenu: [
  { name: "Workshops", fragment: "workshops" },
  { name: "Workshops", fragment: "workshops" }
  ] },
  { name: "Unternehmens Einstellungen", fragment: "company-settings" }
];
menuStructure.map(({ name, fragment, subMenu }) => (
  subMenu.forEach(logMapElements)
))