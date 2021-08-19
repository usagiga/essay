import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

const IndexPage: FC = () => {
  const router = useRouter();

  useEffect(() => {
    void router.replace("/articles", "/");
  });

  return null;
}

export default IndexPage;
