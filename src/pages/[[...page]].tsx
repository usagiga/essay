/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { post } from '../utils/esa/types/post';
import { client } from '../utils/esa/factory';
import style from './[[...page]].module.scss';
import Pager from '../components/pager';

const ArticleList: FC<{ articles: post[] }> = ({ articles }) => (
  <>
    <Head>
      <title>Hello, World!</title>
    </Head>

    <div className={style.container}>
      {articles?.map((article) => (
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
      <Pager />
    </div>
  </>
);

export const getStaticProps: GetStaticProps = async (_) => {
  const articles = await client.getPosts();

  return {
    props: {
      articles,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await client.getPosts();
  const paths = articles.map((article) => ({
    params: { page: ['page', `${article.number}`] },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default ArticleList;
