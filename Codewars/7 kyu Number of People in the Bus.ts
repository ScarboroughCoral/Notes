export function number(busStops: [number, number][]): number {
  return busStops.reduce((s, [on, off]) => s + on - off, 0);
}