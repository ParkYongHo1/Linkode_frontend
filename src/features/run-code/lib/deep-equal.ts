export function deepEqual(actual: unknown, expected: unknown): boolean {
  if (actual === expected) return true;

  if (actual == null || expected == null) return false;

  if (typeof actual !== "object" || typeof expected !== "object") return false;

  const isActualArray = Array.isArray(actual);
  const isExpectedArray = Array.isArray(expected);

  if (isActualArray !== isExpectedArray) return false;

  if (Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) return false;
    for (let i = 0; i < actual.length; i++) {
      if (!deepEqual(actual[i], expected[i])) return false;
    }
    return true;
  }

  const actualKeys = Object.keys(actual);
  const expectedKeys = Object.keys(expected);

  if (actualKeys.length !== expectedKeys.length) return false;

  for (const key of actualKeys) {
    if (!Object.hasOwn(expected, key)) return false;
    if (
      !deepEqual(
        (actual as Record<string, unknown>)[key],
        (expected as Record<string, unknown>)[key],
      )
    )
      return false;
  }
  return true;
}
