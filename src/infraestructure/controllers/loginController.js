import LoginUser from "../../application/use-cases/usuarios/LoginUser.js";
import UserRepository from "../repositories/UserRepositoryMongo.js";
import PasswordEncrypter from "../security/password_encrypter.js";
import TokenGenerator from "../security/token_generator.js";
import UserModel from "../../domain/entities/User.js"

const passwordEncrypter = new PasswordEncrypter();
const userRepository = new UserRepository(UserModel);
const tokenGenerator = new TokenGenerator(process.env.JWT_SECRET || "supersecret");

const loginUser = new LoginUser(userRepository, passwordEncrypter, tokenGenerator);

export default class LoginController {
    static async login(req, res) {
        try {
            const { token, user } = await loginUser.execute(req.body)
            res.json({token, user})
        } catch (error) {
            res.status(401).json({ error: error.message})
        }
    }
}