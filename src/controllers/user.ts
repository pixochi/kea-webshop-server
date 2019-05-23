import {getConnection, Repository} from 'typeorm';

import UserEntity from '../entity/user';

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

  async createUser(newUser: any) {
    return await this.userRepository.save(newUser);
  }

  async deleteByProperties(properties: Partial<UserEntity>) {
    return await this.userRepository.delete(properties);
  }

}
