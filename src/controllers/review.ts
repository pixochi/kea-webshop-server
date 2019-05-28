import {getConnection, Repository} from 'typeorm';

import ReviewEntity from '../entity/review';

export default class ReviewController {

  reviewRepository: Repository<ReviewEntity>;

  constructor() {
    this.reviewRepository = getConnection().manager.getRepository(ReviewEntity);
  };

  async getReview(reviewId: string) {
    return await this.reviewRepository.findOne({id: reviewId});
  }

  async postReview(review) {
    if (review.rating > 10 || review.rating < 1) throw new Error('Review rating must be between 1 and 10!');
    return await this.reviewRepository.save(review);
  }

}
