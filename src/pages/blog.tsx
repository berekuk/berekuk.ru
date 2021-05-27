import { parseISO } from 'date-fns';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

import { BlogDate } from '../components/BlogDate';
import Page from '../layouts/Page';
import { loadAllPosts, Post } from '../utils';

const RssLink: React.FC = () => (
  <em>
    <Link href="/rss.xml" passHref>
      <a>RSS</a>
    </Link>
  </em>
);

const Article: React.FC<{ post: Post }> = ({ post }) => (
  <article>
    <h2 className="text-xl">
      <Link href={post.link}>
        <a>{post.title}</a>
      </Link>
    </h2>
    <div className="mb-2">
      <BlogDate date={parseISO(post.date)} />
    </div>
    <p>{post.excerpt}</p>
  </article>
);

type Props = {
  posts: Post[];
};

const BlogIndexPage: NextPage<Props> = ({ posts }) => {
  return (
    <Page>
      <div className="mb-8">
        <RssLink />
      </div>
      <div className="space-y-8">
        {posts.map(post => (
          <Article post={post} key={post.link} />
        ))}
      </div>
    </Page>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = (await loadAllPosts()).reverse();

  return {
    props: {
      posts,
    },
  };
};

export default BlogIndexPage;
