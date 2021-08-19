/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { post } from '../../utils/esa/types/post';
import { client } from '../../utils/esa/factory';
import style from './index.module.scss';
import Pager from '../../components/pager';

const ArticleList: FC<{ articles: post[] }> = ({ articles }) => {
  // if no articles found,
  const numArticles = articles.length;
  let isEmpty = false;
  if (numArticles <= 0 ) {
    isEmpty = true;
  }

  // calc page length
  const numArticlesPerPage = 10;
  const pageLen = Math.ceil(numArticles / numArticlesPerPage);

  // get page number from query
  const router = useRouter();
  let pageQueryParam = router.query?.page ?? "";
  if (typeof pageQueryParam === "string") {
    pageQueryParam = [pageQueryParam];
  }
  let pageNum = parseInt(pageQueryParam[pageQueryParam.length-1], 10);
  pageNum = Number.isNaN(pageNum) ? Infinity : pageNum;

  // validation query params
  if (pageNum < 1) {
    pageNum = 1;
  }
  if (pageNum > pageLen) {
    pageNum = pageLen;
  }

  // filter article by page number
  const showingArticles = articles.slice((pageLen-pageNum) * numArticlesPerPage, (pageLen-pageNum+1) * numArticlesPerPage);

  // need Pager?
  let needPager = true;
  if (pageLen <= 1) {
    needPager = false;
  }

  return (
    <>
      <Head>
        <title>Hello, World!</title>
      </Head>

      <div className={style.container}>
        {isEmpty && <p>There is no articles.</p>}
        {showingArticles?.map((article) => (
          <article key={article.number}>
            <time dateTime={article.created_at}>
              {(() => {
                const date = new Date(article.created_at);
                const padLeft = (num: number, length: number): string => {
                  const str = `${num}`.padStart(length, '0');

                  return str.slice(-length);
                };
                const y = date.getFullYear();
                const m = padLeft(date.getMonth() + 1, 2);
                const d = padLeft(date.getDate(), 2);

                return `${y}/${m}/${d}`;
              })()}
            </time>
            <header>
              <h2>
                <Link href={`/page/${article.number}`}>
                  <a>{article.name}</a>
                </Link>
              </h2>
            </header>
            {article.tags && (
              <ul className={style.tags}>
                {article.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
        {needPager && <Pager length={pageLen} />}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (_) => {
  const articles = await client.getPosts();

  return {
    props: {
      articles,
    },
  };
};

export default ArticleList;
