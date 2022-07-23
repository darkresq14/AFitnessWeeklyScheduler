export default function findEnumByValue(
  value: string,
  enumerator: Object
): string {
  for (const key in enumerator) {
    if (enumerator.hasOwnProperty(key)) {
      if (enumerator[key] === value) {
        return key;
      }
    }
  }
  return null;
}
