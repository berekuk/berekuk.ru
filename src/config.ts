import path from 'path';

export const config = {
  siteMetadata: {
    title: 'Вячеслав Матюхин',
    siteUrl: 'https://berekuk.ru',
    description:
      'Вячеслав Матюхин. Прикладная рациональность: блог, коучинг, движение lesswrong.ru.',
    keywords: 'lesswrong, рациональность, кочерга, коучинг',
  },
  markdownRoot: path.join(process.cwd(), 'src/markdown'),
  googleAnalyticsId: 'UA-35747472-4',
};
