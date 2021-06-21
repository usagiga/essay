import EsaClient from './client';
import { post } from './types/post';

export default class EsaStubClient extends EsaClient {
  getPosts = (_?: string): Promise<post[]> => {
    const posts: post[] = [];

    for (let i = 0; i < 3; i += 1) {
      posts.push({
        number: i,
        name: `hi! #${i}`,
        full_name: '日報/2015/05/09/hi! #api #dev',
        wip: true,
        body_md: '# Getting Started',
        body_html:
          '<h1 id="1-0-0" name="1-0-0">\n<a class="anchor" href="#1-0-0"><i class="fa fa-link"></i><span class="hidden" data-text="Getting Started"> &gt; Getting Started</span></a>Getting Started</h1>\n',
        created_at: '2015-05-09T11:54:50+09:00',
        message: 'Add Getting Started section',
        url: `https://example.com/posts/1`,
        updated_at: '2015-05-09T11:54:51+09:00',
        tags: ['api', 'dev'],
        category: '日報/2015/05/09',
        revision_number: 1,
        created_by: {
          myself: true,
          name: 'Yamada Taro',
          screen_name: 'taro',
          icon: 'http://example.com/taro.png',
        },
        updated_by: {
          myself: true,
          name: 'Yamada Taro',
          screen_name: 'taro',
          icon: 'http://example.com/taro.png',
        },
      });
    }

    return Promise.resolve(posts);
  };
}
