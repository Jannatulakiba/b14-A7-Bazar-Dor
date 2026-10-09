// if (process.env.NODE_ENV === "development") {
//   const nativeMeasure = performance.measure.bind(performance);

//   performance.measure = ((...args: Parameters<typeof performance.measure>) => {
//     try {
//       return nativeMeasure(...args);
//     } catch (error) {
//       if (
//         typeof args[0] === "string" &&
//         args[0].startsWith("\u200b") &&
//         error instanceof TypeError &&
//         error.message.includes("negative time stamp")
//       ) {
//         return undefined as unknown as PerformanceMeasure;
//       }

//       throw error;
//     }
//   }) as typeof performance.measure;
// }