import User from "../../../domain/entities/User.js";

export default class CreateUserUseCase {
  constructor(userRepository, passwordEncrypter) {
    this.userRepository = userRepository;
    this.passwordEncrypter = passwordEncrypter;
  }

  async execute(userData) {
    const { id, name, email, password, rol } = userData;

    const hashedPassword = await this.passwordEncrypter.hashPassword(password);

    const user = new User({
      id,
      name,
      email,
      password: hashedPassword,
      rol,
      createdAt: new Date()
    });

    return await this.userRepository.create(user);
  }
}
