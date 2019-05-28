import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';

import ProductRegistryController from '../controllers/product-registry';
import OrderEntity from '../entity/order';

@EventSubscriber()
export default class OrderSubscriber implements EntitySubscriberInterface<OrderEntity> {

    // indicates that this subscriber only listen to OrderEntity events
    listenTo() {
        return OrderEntity;
    }

    // called after OrderEntity insertion
    // TODO: use transactions beforeInsert?
    async afterInsert(event: InsertEvent<OrderEntity>) {
        const {
            user,
            items,
        } = event.entity;

			const productRegistryController = new ProductRegistryController();

			items.map(item => {
				productRegistryController.changeAmountInRegistryForProduct(item.product.id, user.country, item.amount * (-1));
			});
    }

}