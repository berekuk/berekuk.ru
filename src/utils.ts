import { promises as fs } from 'fs';
import matter, { GrayMatterFile } from 'gray-matter';
import path from 'path';
import remark from 'remark';
import remarkHtml from 'remark-html';
import strip from 'strip-markdown';
import glob from 'tiny-glob';

import { config } from './config';

export type Post = {
  excerpt: string;
  title: string;
  date: string;
  link: string;
  slug: string;
};

export const loadAllPosts = async (): Promise<Post[]> => {
  const filenames = await glob(`${config.markdownRoot}/blog/*.md`);

  let posts: Post[] = [];
  for (const filename of filenames) {
    const str = await fs.readFile(filename, 'utf-8');
    const content = matter(str);

    const plain = (
      await remark()
        .use(strip)
        .process(content.content)
    ).toString();

    const excerpt =
      plain
        .substr(0, 250)
        .split(/\s+/)
        .slice(0, -1)
        .join(' ') + '...';

    const slug = path.basename(filename, '.md');

    posts.push({
      link: `/blog/${slug}`,
      slug,
      excerpt,
      title: content.data.title as string,
      date: content.data.date as string,
    });
  }

  // from old to new
  posts.sort((a, b) => (a.date < b.date ? -1 : 1));

  return posts;
};

type FullPost = {
  content: GrayMatterFile<string>;
  html: string;
};

export const loadFullPost = async (slug: string): Promise<FullPost> => {
  const markdownPostsRoot = `${config.markdownRoot}/blog`;

  const source = await fs.readFile(
    path.join(markdownPostsRoot, slug + '.md'),
    'utf-8'
  );
  const content = matter(source);

  const html = (
    await remark()
      .use(remarkHtml)
      .process(content.content)
  ).toString();

  return {
    content,
    html,
  };
};
