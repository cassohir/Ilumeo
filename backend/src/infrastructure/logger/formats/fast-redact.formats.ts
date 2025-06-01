type RedactOptions = {
  paths: string[]; // Array of paths to redact (dot-separated)
  censor?: string; // The redaction label, default is '*[Redacted]*'
};

/**
 * Redacts specified paths in an object by replacing their values with a censor string.
 *
 * @param obj The object to redact.
 * @param options Options specifying the paths to redact and the censor string.
 * @returns A redacted copy of the input object.
 */
export function fastRedact(
  obj: Record<string, unknown>,
  options: RedactOptions,
): string {
  const { paths, censor = '*[Redacted]*' } = options;

  const redact = (currentObj: Record<string, unknown>, pathArray: string[]) => {
    if (pathArray.length === 1) {
      // If we're at the final key, replace its value
      const key = pathArray[0];
      if (currentObj.hasOwnProperty(key)) {
        currentObj[key] = censor;
      }
    } else {
      // Traverse deeper into the object if the next key exists
      const [key, ...rest] = pathArray;
      if (
        currentObj.hasOwnProperty(key) &&
        typeof currentObj[key] === 'object' &&
        currentObj[key] !== null
      ) {
        redact(currentObj[key] as Record<string, unknown>, rest);
      }
    }
  };

  // Clone the object to avoid mutating the original
  const clonedObj = JSON.parse(JSON.stringify(obj));

  for (const path of paths) {
    const pathArray = path.split('.');
    redact(clonedObj, pathArray);
  }

  return JSON.stringify(clonedObj);
}
