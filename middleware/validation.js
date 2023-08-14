export const validation = (schema) => {
    return (req, res, next) => {
        const requestsKey = ['body', 'query', 'params', 'headers']
        let errorsArray = []
        for (const key of requestsKey) {
            if (schema[key]) {
                const result = schema[key].validate(req[key], { abortEarly: false })
                if (result?.error?.details)
                    errorsArray.push(result?.error?.details)
            }
        }
        if (!errorsArray.length) return next()
        return res.json({ message: "validationError", errors: errorsArray })



    }
}