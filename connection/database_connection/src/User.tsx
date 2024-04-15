class User {
  constructor(
    private username: string = "",
    private password: string = "",
    private address: string = "",
    private birthday: string = "",
    private gender: string = "",
    private phone: string = "",
    private email: string = ""
  ) {}

  public getUsername(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password; // Consider hashing password before returning for security reasons
  }

  public getAddress(): string {
    return this.address;
  }

  public getBirthday(): string {
    return this.birthday;
  }

  public getGender(): string {
    return this.gender;
  }

  public getPhone(): string {
    return this.phone;
  }

  public getEmail(): string {
    return this.email;
  }

  // Setters (consider adding validation logic as needed)
  public setUsername(username: string): void {
    this.username = username;
  }

  public setPassword(password: string): void {
    // Hash the password before setting it (e.g., using a suitable hashing library)
    this.password = password; // Replace with your password hashing function
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public setBirthday(birthday: string): void {
    this.birthday = birthday;
  }

  public setGender(gender: string): void {
    this.gender = gender;
  }

  public setPhone(phone: string): void {
    this.phone = phone;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public fetchData(data: any): void {
    this.username = data.username;
    this.password = data.password;
    this.address = data.address;
    this.birthday = data.birthday;
    this.email = data.email;
    this.gender = data.gender;
    this.phone;
  }
}

export { User };
