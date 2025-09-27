export default class GetUSersUseCase {
    constructor (userRepository) {
        this.userRepository = userRepository
    }
    async execute () {
        return await this.userRepository.findAll()
    }
}