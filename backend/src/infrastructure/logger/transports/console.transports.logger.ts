import { transports, format } from 'winston';

const consoleTransport = new transports.Console({
  format: format.prettyPrint({
    depth: 5,
    colorize: true,
  }),
});

export { consoleTransport };
