import { TransformableInfo } from 'logform';
import { format } from 'winston';

import { fastRedact } from './fast-redact.formats';
import { getFullKeyPaths } from '@/shared/utils/object';

type RedactSensitiveFormatOptions = {
  /**
   * An array of keys to be searched inside `infoObject` (nested objects will be affected). If a match is found, the value of the key will be replaced with `redactLabel`.
   */
  redactKeys: string[];

  /**
   * A string that will be used to replace the value of any key that matches the `redactKeys` array.
   * @default '*[Redacted]*'
   */
  redactLabel?: string;
};

/**
 * A winston format that redacts sensitive information from the `infoObject`.
 */
const redactSensitiveKeys = format(
  (info: TransformableInfo, opts?: unknown) => {
    // Validate options type
    if (
      !opts ||
      typeof opts !== 'object' ||
      !Array.isArray((opts as RedactSensitiveFormatOptions).redactKeys)
    ) {
      throw new Error('Invalid options provided to redactSensitiveKeys.');
    }

    const options = opts as RedactSensitiveFormatOptions;

    const fullKeyPaths = options.redactKeys.flatMap((key) =>
      getFullKeyPaths(info, key),
    );

    if (fullKeyPaths.length === 0) {
      // If no keys are found, return the original object without modification.
      return info;
    }

    const redacted = fastRedact(info, {
      censor: options.redactLabel || '*[Redacted]*',
      paths: fullKeyPaths,
    }) as string;
    const redactedInfo = JSON.parse(redacted) as TransformableInfo;
    return Object.assign(info, redactedInfo);
  },
);

export default redactSensitiveKeys;
