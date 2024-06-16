export class User {
  userId: string;
  email: string;
  username: string;

  constructor(userId: string, email: string, username?: string) {
    this.userId = userId;
    this.email = email;
    if (!username || username === "") {
      this.username = email.substring(0, email.indexOf("@"));
    } else {
      this.username = username;
    }
  }

  toDatabaseFormat() {
    return {
      userId: this.userId,
      email: this.email,
      username: this.username,
    };
  }

  static toUserFormat(data: any) {
    return new User(data.userId, data.email, data.username);
  }

  isDataValid(): boolean {
    return true;
  }
}

// ###################### TEST ######################
export const users = {
  user1: "user1",
  user2: "user2",
};
