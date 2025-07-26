export const productsPerPage = 10;

export function getTotalPages(totalProducts: number): number {
  return Math.ceil(totalProducts / productsPerPage);
}
