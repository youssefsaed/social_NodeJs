import jwt from "jsonwebtoken"


export const Jwt = class {
    constructor({ payload } = {}) {
        this.payload = payload
    }

    sign() {
        return jwt.sign(this.payload, process.env.SIGNTURE, { expiresIn: '1d' })
    }
    verify(token) {
        return jwt.verify(token, process.env.SIGNTURE)
    }


}