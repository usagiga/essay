import 'modern-css-reset/src/reset.css';
import '../styles/global.css';
import type { AppProps } from 'next/app';
import BaseLayout from '../layouts/base';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <BaseLayout>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </BaseLayout>
  );
}

export default MyApp;
