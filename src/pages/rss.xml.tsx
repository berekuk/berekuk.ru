import { parseISO } from 'date-fns';
import { Feed } from 'feed';
import { GetServerSideProps, NextPage } from 'next';

import { config } from '../config';
import { loadAllPosts, loadFullPost } from '../utils';

const FakePage: NextPage = () => <div />;

export default FakePage;

const getRss = async () => {
  const feed = new Feed({
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
    id: config.siteMetadata.siteUrl,
    copyright: '',
  });

  const posts = await loadAllPosts();

  const ENTRIES = 20;
  for (const post of posts.reverse().slice(0, ENTRIES)) {
    const fullPost = await loadFullPost(post.slug);
    feed.addItem({
      title: post.title,
      id: post.link,
      link: `${config.siteMetadata.siteUrl}${post.link}`,
      date: parseISO(post.date),
      description: post.excerpt,
      content: fullPost.html,
    });
  }

  return feed.atom1();
};

export const getServerSideProps: GetServerSideProps = async context => {
  const res = context.res;
  if (!res) {
    return { props: {} };
  }
  // fetch your RSS data from somewhere here
  res.setHeader('Content-Type', 'text/xml');
  res.write(await getRss());
  res.end();

  return { props: {} };
};
