export function makeUnique(array: any[], uniqueBy: any, keepFirst = true) {
  const newArr = Array.from(
    array
      ?.reduce((map: any, e: any) => {
        let key = uniqueBy
          ?.map((key: any) => [e[key], typeof e[key]])
          ?.flat()
          .join("-");
        if (keepFirst && map?.has(key)) return map;
        return map.set(key, e);
      }, new Map())
      ?.values()
  ) as {
    label?: string | number;
    value: string | number;
    name?: string | number;
    default?: boolean;
  }[];
  return newArr;
}
