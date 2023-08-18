module.exports = {
  title: 'AKE.kr',
  description: '',

  // deploy options
  url: 'https://ake.kr',
  base: '/',
  dest: 'compiled',

  // profile
  author: 'mAKEkr',
  email: 'm@ake.kr',

  theme: 'vuepress-theme-typewriter',
  // scss: {
  //   data: '@import "@theme/styles/global-variables.scss";'
  // },
  head: [
    ['link', {
      rel: 'preconnect',
      href: 'https://utteranc.es/'
    }]
  ],
  themeConfig: {
    nav: [
      { text: 'Portfolio', link: 'https://hello.ake.kr/', outLink: true, newWindow: true },
      { text: 'Short Posts', link: 'https://shortpost.ake.kr/', outLink: true, newWindow: true }
    ],
    copyright: 'Copyright 2010-2019 AKE.kr all rights reserved.',
    github: 'mAKEkr',
    feed: 'rss.xml',
    comment: {
      'repo': 'mAKEkr/blog',
      'issue-term': 'url'
    }
  },
  markdown: {
    lineNumbers: true,
    anchor: {
      permalinkBefore: false
    }
  },
  plugins: [
    ['@vuepress/blog', {
      directories: [
        // set indexpage
        {
          id: 'post',
          dirname: '_posts',
          path: '/',
          itemPermalink: '/:year/:month/:day/:slug'
        }
      ],
      frontmatters: [
        {
          id: 'category',
          keys: ['categories'],
          path: '/category/',
          layout: 'Categories',
          scopeLayout: 'Category'
        }
      ]
    }],
    ['vuepress-plugin-sitemap', {
      hostname: 'https://ake.kr'
    }],
    'vuepress-plugin-seo',
    ['vuepress-plugin-feed', {
      canonical_base: 'https://ake.kr'
    }]
  ],
  evergreen: true
}
