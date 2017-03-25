import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import { CrvrConfig } from '../../crvrConfig';

@inject(HttpClient)
export class PostsRepository {
    constructor(HttpClient) {
        this.http = HttpClient;
      
        this.http.configure(x => {
            x.withBaseUrl(CrvrConfig.pnutApiBaseUrl);
            x.withHeader('Authorization', 'Bearer ' + localStorage.pnutToken);
        });
    }

    async getPosts() {
        const response = await this.http.get('posts/streams/me');
        let data = JSON.parse(response.response);

        return { postsMeta: data.meta, posts: data.data};
    }
}