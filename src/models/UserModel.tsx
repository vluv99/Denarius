export class UserModel {
  userId?: number | undefined;
  userName: string;

  constructor(data: UserModel) {
    this.userId = data.userId;
    this.userName = data.userName;
  }

  // static toModel(u: User): UserModel {
  //
  //     return model;
  // }
}

export const users = {
  user1: "user1",
  user2: "user2",
};
