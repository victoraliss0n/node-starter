// import { createLogger, transports, format } from 'winston';
// import path from 'path';
// import config from './../config';

// const enumerateErrorFormat = format(info => {
//   if (info.message instanceof Error) {
//     info.message = Object.assign({
//       message: info.message.message,
//       stack: info.message.stack,
//     }, info.message);
//   }

//   if (info instanceof Error) {
//     return Object.assign({
//       message: info.message,
//       stack: info.stack,
//     }, info);
//   }

//   return info;
// });

// const logger = createLogger({
//   format: format.combine(
//     format.timestamp(),
//     enumerateErrorFormat(),
//     format.json(),
//   ),
//   level: 'info',
//   transports: [
//     new transports.File({
//       filename: path.join(config.log.basePath, config.log.fileErrors),
//       level: 'error',
//     }),
//     new transports.Console({
//       format: format.printf((info) => {
//         if (typeof info.message === 'undefined') {
//           let message = Object.assign({}, info);
//           delete message.timestamp;
//           delete message.level;
//           info.message = JSON.stringify(message);
//         }

//         if (typeof info.message === 'object') {
//           info.message = JSON.stringify(info.message);
//         }

//         const { timestamp, level, message, ...extras } = info;
//         const additionalInfomartions = Object.keys(extras).length > 0 ? JSON.stringify(extras) : '';

//         return `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message} ${additionalInfomartions}`;
//       }),
//       level: config.isProduction ? 'info' : 'debug',
//     }),
//   ],
//   exceptionHandlers: [
//     new transports.File({
//       filename: path.join(config.log.basePath, config.log.fileExceptions),
//     }),
//   ],
// });

// if (config.debug === true) {
//   logger.add(new transports.File({
//     filename: path.join(config.log.basePath, config.log.fileDebug),
//     level: 'debug',
//   }));
// }

// export default logger;