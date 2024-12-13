interface User {
  id: string;
  name: string;
  email: string;
  aadhaar: string;
  dob: string;
  phone: string;
  password: string; // In a real app, you'd store hashed passwords
}

class Database {
  private users: User[] = [];

  createUser(user: Omit<User, 'id'>): User {
    const newUser = { ...user, id: Date.now().toString() };
    this.users.push(newUser);
    return newUser;
  }

  getUserByAadhaar(aadhaar: string): User | undefined {
    return this.users.find(user => user.aadhaar === aadhaar);
  }

  updateUser(id: string, userData: Partial<User>): User | undefined {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...userData };
      return this.users[index];
    }
    return undefined;
  }
}

export const db = new Database();

