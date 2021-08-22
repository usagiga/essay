import { FC } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from './base.module.scss';

const BaseLayout: FC = ({ children }) => {
  const title = 'BlogTitle';
  const logoPath = process.env.ESSAY_LOGO_PATH ?? '/vercel.svg';

  return (
    <>
      <Head>
        <title>essay</title>
      </Head>

      <div className={styles.page}>
        <header>
          {logoPath !== '' && (
            <div className={styles.logo}>
              <Image src={logoPath} alt="Logo" width={64} height={64} />
            </div>
          )}
          <h1>{title}</h1>
        </header>
        <main>{children}</main>
      </div>
    </>
  );
};

export default BaseLayout;
