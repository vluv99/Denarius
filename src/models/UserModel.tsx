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
  Lau: "Lau",
  Peter: "Peter",
};
