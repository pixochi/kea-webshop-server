import { expect } from 'chai';

import UserController from '../src/controllers/user';
import UserEntity from '../src/entity/user';

describe('User controller', () => {
     it('should find an existing user with a provided email address', async () => {

          const USER_EMAIL_ADDRESS = 'user@user.com';
          const userController = new UserController();

          // Delete a user
          await userController.deleteByProperties({email: USER_EMAIL_ADDRESS});

          // Create a new user
          const user = new UserEntity();
          user.password = 'secret_password_929@';
          user.email = USER_EMAIL_ADDRESS;
          await userController.createUser(user);

          // Check if a user with the provided email address exists
          const foundUser = await userController.checkIfExists(USER_EMAIL_ADDRESS);
          expect(foundUser).to.be.an('object');
     });

     it('should not find an existing user with a provided email address', async () => {

          const USER_EMAIL_ADDRESS = 'user@user.com';
          const userController = new UserController();

          // Delete a user
          await userController.deleteByProperties({email: USER_EMAIL_ADDRESS});

          // Check if a user with the provided email address exists
          const foundUser = await userController.checkIfExists(USER_EMAIL_ADDRESS);
          expect(foundUser).to.be.an('undefined');
     });
});

/*
     ○ Unit tests will be created for at least 3 methods/functions. 
     ○ Each unit test will include at least 5 assertions. 
     ○ At least 2 assertions will return true. 
     ○ At least 2 assertions will return false.
     ○ At least one data provider will be implemented. 
*/