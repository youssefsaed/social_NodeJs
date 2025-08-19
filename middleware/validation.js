
export const validation = (schema) => {
    return (req, res, next) => {
        const requestsKey = { ...req.body, ...req.query, ...req.params }

        const result = schema.validate(requestsKey, { abortEarly: false })
        const errors = result?.error?.details.map(elm => elm.message)

        if (errors) return res.json({ message: "validationError", errors })
        return next()
    }

}
