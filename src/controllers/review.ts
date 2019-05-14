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
    return await this.reviewRepository.save(review);
  }

}
