import CreateUserUseCase from "../../application/use-cases/usuarios/CreateUserUseCase.js";
import GetUSersUseCase from "../../application/use-cases/usuarios/GetUsersUseCase.js";
import UserRepositoryMongo from "../repositories/UserRepositoryMongo.js";
import PasswordEncrypter from "../security/password_encrypter.js";

const userRepository = new UserRepositoryMongo();
const passwordEncrypter = new PasswordEncrypter();

export const createUser = async (req, res) => {
  try {
    const useCase = new CreateUserUseCase(userRepository, passwordEncrypter);
    const user = await useCase.execute(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const useCase = new GetUSersUseCase(userRepository);
    const users = await useCase.execute();
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}