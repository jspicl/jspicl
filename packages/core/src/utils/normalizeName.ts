export function normalizeName(name: string) {
  return name.toLowerCase().replace(/\$/g, "_");
}
