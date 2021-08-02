import { FC } from 'react';
import Link from 'next/link';
import style from './pager.module.scss';

const Pager: FC = () => (
  <div className={style.container}>
    <Link href="/">&lt; Newer</Link>

    <Link href="/">Older &gt;</Link>
  </div>
);

const generatePagerButtons: FC = () => {
  const selectedNum = 3;
  const viewNum = 7;
  const pageNum = 10;
  const pages = [...Array(pageNum).keys()].reverse();

  // selected 近傍
  const kinbouNum = viewNum - (true ? 2 : 0) - 2;

  return (
    <div>
      <p>yeah</p>
    </div>
  );
};

export default Pager;
