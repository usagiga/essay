/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import Link from 'next/link';
import style from './pager.module.scss';

interface PagerProps {
  selectedIndex?: number
  length: number
  routeCallback: (pageNum: number) => string
}

const Pager: FC<PagerProps> = ({ length, routeCallback }) => {
  const arr = [...Array(length).keys()].reverse().map(n => n+1);

  return (
    <div className={style.container}>
      {arr.map((num) => (
         <Link href={routeCallback(num)} key={num}>
           <a>{num}</a>
         </Link>
      ))}
    </div>
  );
};

export default Pager;
