// export const globalError = (err, req, res, next) => {
//     if (process.env.MOOD == 'dev') {
//         dev(err, res)
//     }
//     else {
//         pro(err, res)
//     }
// }

// const dev = (err, res) => {
//     res.status(404).json({ message: err.message, stack: err.stack })
// }
// const pro = (err, res) => {
//     res.status(404).json({ message: err.message })
// }