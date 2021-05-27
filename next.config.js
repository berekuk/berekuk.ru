module.exports = {
  async redirects() {
    return [
      {
        source: '/blog/:year/:month/:day/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ];
  },
};
