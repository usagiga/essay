// noinspection HtmlUnknownAttribute,HttpUrlsUsage

module.exports = () => {
  const data = {
    posts: {}
  };

  data.posts = {
    "posts": [
      {
        "number": 1,
        "name": "hi!",
        "full_name": "日報/2015/05/09/hi! #api #dev",
        "wip": true,
        "body_md": "# Getting Started",
        "body_html": "<h1 id=\"1-0-0\" name=\"1-0-0\">\n<a class=\"anchor\" href=\"#1-0-0\"><i class=\"fa fa-link\"></i><span class=\"hidden\" data-text=\"Getting Started\"> &gt; Getting Started</span></a>Getting Started</h1>\n",
        "created_at": "2015-05-09T11:54:50+09:00",
        "message": "Add Getting Started section",
        "url": "https://example.com/posts/1",
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
    "next_page": null,
    "total_count": 1,
    "page": 1,
    "per_page": 100,
    "max_per_page": 100
  };

  return data;
};
