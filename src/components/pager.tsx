/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import Link from 'next/link';
import style from './pager.module.scss';

interface PagerProps {
  selectedIndex?: number
  length: number
}

const Pager: FC<PagerProps> = ({ length }) => {
  const arr = [...Array(length).keys()].reverse().map(n => n+1);

  return (
    <div className={style.container}>
      {arr.map((num) => (
        <Link href={`./${num}`} key={num}>
          <a>{num}</a>
        </Link>
      ))}
    </div>
  );
};

export default Pager;
