import { EventSubscriber, EntitySubscriberInterface, UpdateEvent } from 'typeorm';

import UserController from '../controllers/user';
import UserEntity from '../entity/user';

@EventSubscriber()
export default class OrderSubscriber implements EntitySubscriberInterface<UserEntity> {

    // indicates that this subscriber only listen to UserEntity events
    listenTo() {
        return UserEntity;
    }

    // called after UserEntity update
    async afterUpdate(event: UpdateEvent<UserEntity>) {
      const {
          databaseEntity,
          updatedColumns,
      } = event;

      const didChangePassword = updatedColumns.some(column => column.propertyName === 'password');

      if (didChangePassword) {
        const userController = new UserController();
        userController.updateUser(databaseEntity.id, {previousPassword: databaseEntity.password});
      }

    }

}