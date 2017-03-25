import {inject} from 'aurelia-framework';
import {PostsRepository} from '../../domain/repositories/postsRepository'

@inject(PostsRepository)
export class AboutPageViewModel {
    constructor(postsRepository) {
      this.postsRepository = postsRepository;
    }

    async activate() {
        let result = await this.postsRepository.getPosts();
        this.postsMeta = result.postsMeta;
        this.posts = result.posts;
  }
}