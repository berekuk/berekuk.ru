import { format, parseISO } from 'date-fns';
import Disqus from 'disqus-react';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import path from 'path';
import React from 'react';
import glob from 'tiny-glob';

import { BlogDate } from '../../components/BlogDate';
import { config } from '../../config';
import Page from '../../layouts/Page';
import { loadAllPosts, loadFullPost, Post } from '../../utils';

type Props = {
  title: string;
  html: string;
  date: string;
  slug: string;

  context: {
    prev: Post | null;
    next: Post | null;
  };
};

const markdownPostsRoot = `${config.markdownRoot}/blog`;

const BlogPostPage: NextPage<Props> = ({
  html,
  title,
  date: dateStr,
  slug,
  context,
}) => {
  const date = parseISO(dateStr);

  const disqusPath = `/blog/${format(date, 'yyyy/MM/dd')}/${slug}/`;
  const disqusConfig = {
    url: `${config.siteMetadata.siteUrl}/${disqusPath}`,
    identifier: disqusPath,
  };

  return (
    <Page title={`${title} | ${config.siteMetadata.title}`}>
      <article className="prose prose-blue">
        <h1 className="text-xl">{title}</h1>
        <div className="mb-2">
          <BlogDate date={date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      <footer className="text-sm">
        <hr />
        {/* {frontmatter.categories &&
          frontmatter.categories.map(e => `#${e}`).join(', ')} */}
        <div className="mt-4 flex justify-between">
          {context.prev && (
            <Link href={context.prev.link} passHref>
              <a>&larr; {context.prev.title}</a>
            </Link>
          )}
          {context.next && (
            <Link href={context.next.link} passHref>
              <a>{context.next.title} &rarr;</a>
            </Link>
          )}
        </div>
      </footer>
      <Disqus.DiscussionEmbed shortname="berekuk" config={disqusConfig} />
    </Page>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params?.slug) {
    throw new Error('Expected slug');
  }
  const slug = params?.slug as string;

  const { content, html } = await loadFullPost(slug);

  const title = content.data.title as string;
  const date = content.data.date as string;

  const allPosts = await loadAllPosts();

  const index = allPosts.findIndex(post => post.slug === slug);

  const context = {
    prev: index <= 0 ? null : allPosts[index - 1],
    next: index >= allPosts.length - 1 ? null : allPosts[index + 1],
  };

  return {
    props: {
      html,
      title,
      date,
      slug,
      context,
    },
  };
};

export const getStaticPaths = async () => {
  const filenames = await glob(`${markdownPostsRoot}/*.md`);

  let paths = [];
  for (const filename of filenames) {
    const slug = path.basename(filename, '.md');
    paths.push({
      params: {
        slug,
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export default BlogPostPage;
