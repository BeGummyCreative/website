export type RowItem<T> = { item: T; ratio: number };
export type JustifiedRow<T> = { items: RowItem<T>[]; filler: number };

type Options = {
  // Sum of width÷height ratios that makes a full row (3.2 ≈ four portraits or two landscapes).
  target?: number;
  // Below this, a row filling the full width would be absurdly tall (e.g. one portrait).
  min?: number;
};

// Splits items, in order, into the rows whose ratio sums stay closest to the target
// overall, so every row can run edge to edge at one shared height with no cropping.
// Render each item with `flex: <ratio> 1 0%`; a non-zero filler is an empty flex item
// (same rule) that keeps a too-sparse row at normal height instead of stretching it.
export function justifiedRows<T>(
  list: T[],
  ratioOf: (item: T) => number,
  { target = 3.2, min = 1.2 }: Options = {},
): JustifiedRow<T>[] {
  const items: RowItem<T>[] = list.map((item) => ({ item, ratio: ratioOf(item) }));
  const prefix = [0];
  for (const { ratio } of items) prefix.push(prefix[prefix.length - 1] + ratio);

  // best[i]: lowest cost for laying out the first i items; start[i]: where its last row begins.
  const best = [0];
  const start = [0];
  for (let end = 1; end <= items.length; end += 1) {
    best[end] = Infinity;
    for (let begin = 0; begin < end; begin += 1) {
      const cost = best[begin] + (prefix[end] - prefix[begin] - target) ** 2;
      if (cost < best[end]) {
        best[end] = cost;
        start[end] = begin;
      }
    }
  }

  const rows: RowItem<T>[][] = [];
  for (let end = items.length; end > 0; end = start[end]) rows.unshift(items.slice(start[end], end));

  return rows.map((row) => {
    const rowRatio = row.reduce((total, { ratio }) => total + ratio, 0);
    return { items: row, filler: rowRatio < min ? target - rowRatio : 0 };
  });
}
