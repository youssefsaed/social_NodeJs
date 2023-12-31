import bcrypt from 'bcryptjs'
export const Password = class {
    constructor(orignalPass) {
        this.Password = orignalPass
    }

    hash() {
        return bcrypt.hashSync(this.Password, +process.env.SALT_ROUNDS)
    }
    compare(hashed) {
        return bcrypt.compareSync(this.Password, hashed)
    }
}