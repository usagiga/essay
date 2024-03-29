import { pageNation } from "./page-nation";
import { editor } from "./editor";

/* eslint-disable camelcase */

export interface post {
  number: number
  name: string
  full_name: string
  wip: boolean
  body_md: string
  body_html: string
  created_at: string
  message: string
  url: string
  updated_at: string
  tags: string[]
  category: string
  revision_number: number
  created_by: editor
  updated_by: editor
}

export interface getPostResponse extends pageNation {
  posts: post[]
}

// Example
//
// {
//   "number": 1,
//   "name": "hi!",
//   "full_name": "日報/2015/05/09/hi! #api #dev",
//   "wip": true,
//   "body_md": "# Getting Started",
//   "body_html": "<h1 id=\"1-0-0\" name=\"1-0-0\">\n<a class=\"anchor\" href=\"#1-0-0\"><i class=\"fa fa-link\"></i><span class=\"hidden\" data-text=\"Getting Started\"> &gt; Getting Started</span></a>Getting Started</h1>\n",
//   "created_at": "2015-05-09T11:54:50+09:00",
//   "message": "Add Getting Started section",
//   "url": "https://docs.esa.io/posts/1",
//   "updated_at": "2015-05-09T11:54:51+09:00",
//   "tags": [
//     "api",
//     "dev"
//   ],
//   "category": "日報/2015/05/09",
//   "revision_number": 1,
//   "created_by": {
//     "myself": true,
//     "name": "Atsuo Fukaya",
//     "screen_name": "fukayatsu",
//     "icon": "http://img.esa.io/uploads/production/users/1/icon/thumb_m_402685a258cf2a33c1d6c13a89adec92.png"
//   },
//   "updated_by": {
//     "myself": true,
//     "name": "Atsuo Fukaya",
//     "screen_name": "fukayatsu",
//     "icon": "http://img.esa.io/uploads/production/users/1/icon/thumb_m_402685a258cf2a33c1d6c13a89adec92.png"
//   }
// };
