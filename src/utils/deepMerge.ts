import { isObject } from "./isObject";


export function deepMerge(
  target: Record<string, any>,
  source: Record<string, any>
) {
  const result = { ...target };

  for (const key in source) {
    if (isObject(source[key]) && isObject(result[key])) {
      result[key] = deepMerge(result[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}
