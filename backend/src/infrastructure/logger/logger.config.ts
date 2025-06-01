import { createLogger, format } from 'winston';

import { ConsoleTransportInstance } from 'winston/lib/winston/transports';
import { consoleTransport } from './transports/console.transports.logger';
import redactSensitiveKeys from './formats/redact-sensitive-keys.formats.logger';

const transports: ConsoleTransportInstance[] = [consoleTransport];

const logger = createLogger({
  format: format.combine(
    redactSensitiveKeys({
      redactKeys: [
        'token',
        'password',
        'authorization',
        'passwordConfirmation',
      ],
    }),
    format.metadata(),
    format.timestamp(),
  ),
  exitOnError: false,
  transports,
});

export default logger;
