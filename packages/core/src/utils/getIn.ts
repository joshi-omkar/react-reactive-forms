export function getPath(obj: any, path: string) {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  }
  