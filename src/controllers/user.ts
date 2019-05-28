import {getConnection, Repository} from 'typeorm';

import UserEntity from '../entity/user';
import User from '../entity/user';

export default class UserController {

  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = getConnection().manager.getRepository(UserEntity);
  }

  async user(userId: string) {
    return await this.userRepository.findOne({id: userId});
  }

  async checkIfExists(userEmail: string) {
      return await this.userRepository.findOne({email: userEmail});
  }

  async logIn(userEmail: string) {
      return await this.userRepository.findOne({email: userEmail});
  }

  async allUsers(){
    return await this.userRepository.find();
  }

  async deleteByProperties(properties: Partial<UserEntity>) {
    return await this.userRepository.delete(properties);
  }

  async createUser(newUser: Partial<Exclude<UserEntity, 'id'>>) {
    return await this.userRepository.save(newUser);
  }

  async changePassword(userId: string, newPassword: string) {
    const user = new User();
    user.id = userId;
    user.password = newPassword;

    return await this.userRepository.save(user);
  }

  async updateUser(userId: string, updatedUserProps: Partial<Exclude<UserEntity, 'id'>>) {
    return await this.userRepository.update(userId, updatedUserProps);
  }

}
