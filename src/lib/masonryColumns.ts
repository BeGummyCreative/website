export type ColumnItem<T> = { item: T; ratio: number; index: number };

type Options<T> = {
  columns?: number;
  // Height under each image plus the gap to the next card, as a fraction of the column
  // width (title + summary, and anything else a card shows, such as film clips). A
  // number, or one per item. Measured on the archive: captions ~0.16, gap ~0.15.
  caption?: number | ((item: T) => number);
};

// Equal-width masonry: items keep their order and each goes into whichever column is
// currently shortest (heights estimated from width÷height ratios plus a caption), so
// every cover is the same width at its own shape and the columns end close to level.
// `index` is the item's original position, for restoring order where columns collapse.
export function masonryColumns<T>(
  list: T[],
  ratioOf: (item: T) => number,
  { columns = 3, caption = 0.31 }: Options<T> = {},
): ColumnItem<T>[][] {
  const result: ColumnItem<T>[][] = Array.from({ length: columns }, () => []);
  const heights = new Array<number>(columns).fill(0);

  list.forEach((item, index) => {
    const ratio = ratioOf(item);
    const shortest = heights.indexOf(Math.min(...heights));
    result[shortest].push({ item, ratio, index });
    heights[shortest] += 1 / ratio + (typeof caption === "function" ? caption(item) : caption);
  });

  // Empty columns stay, so covers are the same width even in a category with few projects.
  return result;
}
