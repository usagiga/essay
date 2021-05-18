// noinspection HtmlUnknownAttribute,HttpUrlsUsage

module.exports = () => {
  const data = {
    // Applied custom routes for testing page nation
    // See also ./routes.json
    posts_1: {},
    posts_2: {},
    posts_3: {}
  };

  const numPosts = 3;
  for (let i = 1; i <= numPosts; i += 1) {
    const nextPage = i !== numPosts ? i + 1 : null;

    data[`posts_${i}`] = {
      "posts": [
        {
          "number": i,
          "name": "hi!",
          "full_name": "日報/2015/05/09/hi! #api #dev",
          "wip": true,
          "body_md": "# Getting Started",
          "body_html": "<h1 id=\"1-0-0\" name=\"1-0-0\">\n<a class=\"anchor\" href=\"#1-0-0\"><i class=\"fa fa-link\"></i><span class=\"hidden\" data-text=\"Getting Started\"> &gt; Getting Started</span></a>Getting Started</h1>\n",
          "created_at": "2015-05-09T11:54:50+09:00",
          "message": "Add Getting Started section",
          "url": `https://example.com/posts/${i}`,
          "updated_at": "2015-05-09T11:54:51+09:00",
          "tags": [
            "api",
            "dev"
          ],
          "category": "日報/2015/05/09",
          "revision_number": 1,
          "created_by": {
            "myself": true,
            "name": "Yamada Taro",
            "screen_name": "taro",
            "icon": "http://example.com/taro.png"
          },
          "updated_by": {
            "myself": true,
            "name": "Yamada Taro",
            "screen_name": "taro",
            "icon": "http://example.com/taro.png"
          }
        }
      ],
      "prev_page": null,
      "next_page": nextPage,
      "total_count": numPosts,
      "page": i,
      "per_page": 100,
      "max_per_page": 100
    };
  }

  return data;
};
