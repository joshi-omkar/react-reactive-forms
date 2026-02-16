export function setPath(obj: any, path: string, value: any) {
    const keys = path.split(".");
    const last = keys.pop();
  
    let current = obj;
  
    for (const key of keys) {
      if (!current[key]) current[key] = {};
      current = current[key];
    }
  
    if (last) current[last] = value;
  
    return obj;
  }
  