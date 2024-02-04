export default function generateArray(start = 0, stop = null, step = 1) {
  const min = stop !== null ? start : 0;
  const max = stop !== null ? stop : start;
  const range = [];
  for (let i = min; i < max; i += step) {
    range.push(i);
  }
  return range;
}
