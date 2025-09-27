class User {
  constructor({ id, name, email, password, rol, createdAt }) {
    if(!name || name.length < 3) throw new Error('El nombre es obligatorio y debe tener al menos 3 caracteres');
    if(!email || email.length < 7 || !email.includes('@')) throw new Error('El email es obligatorio y debe tener un formato válido: example@gmail.com');
     
    this.name = name
    this.email = email;
    this.password = password;
    this.rol = rol;
    this.createdAt = createdAt;
  }
}

export default User;
