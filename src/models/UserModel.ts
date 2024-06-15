export class User {
  userId: string;
  username: string;
  email: string;

  constructor(userId: string, username: string, email: string) {
    this.userId = userId;
    this.username = username;
    this.email = email;
  }

  toDatabaseFormat() {
    return {
      userId: this.userId,
      username: this.username,
      email: this.email,
    };
  }

  static toUserFormat(data: any) {
    return new User(data.userId, data.username, data.email);
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
