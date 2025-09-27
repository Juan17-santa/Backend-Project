import jwt from "jsonwebtoken";

export default class TokenGenerator {
    constructor(secret, expireIn = process.env.JWT_EXPIRES_IN || "10m") {
        this.secret = secret
        this.expireIn = expireIn
    }

    generate(payload) {
        return jwt.sign(payload, this.secret, {expiresIn: this.expireIn})
    }

    verify(token) {
        try {
            const decoded = jwt.verify(token, this.secret);
            return { valid: true, expired: false, payload: decoded};
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return { valid: false, expired: true, payload: null}
            }
            return { valid:false, expired:false, payload:null}
        }
    }
}