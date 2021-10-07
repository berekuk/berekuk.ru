import { promises as fs } from 'fs';
import matter from 'gray-matter';
import { GetStaticProps, NextPage } from 'next';
import path from 'path';
import remark from 'remark';
import remarkHtml from 'remark-html';
import glob from 'tiny-glob';

import { config } from '../config';
import Page from '../layouts/Page';

type Props = {
  html: string;
  title?: string;
  header?: boolean;
};

const markdownPagesRoot = `${config.markdownRoot}/pages`;

const MarkdownPage: NextPage<Props> = ({ html, title, header = true }) => {
  return (
    <Page header={header} title={title}>
      <article
        className="prose prose-blue"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Page>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!(params?.slug || [] instanceof Array)) {
    throw new Error('Expected slug array');
  }
  const source = await fs.readFile(
    path.join(markdownPagesRoot, ...(params?.slug || ['index'])) + '.md',
    'utf-8'
  );
  const content = matter(source);

  const html = (
    await remark()
      .use(remarkHtml)
      .process(content.content)
  ).toString();

  return {
    props: {
      html,
      header: content.data.header ?? true,
      title: content.data.title || null,
    },
  };
};

export const getStaticPaths = async () => {
  const filenames = await glob(`${markdownPagesRoot}/**/*.md`);

  let paths = [];
  for (const filename of filenames) {
    const str = await fs.readFile(filename, 'utf-8');
    const content = matter(str);
    const pagePath = content.data.path as string;
    const slug = pagePath.split(path.sep).filter(part => part !== '');
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

export default MarkdownPage;
