const { description } = require('../../package');
const fs = require("fs");
const path = require("path");


module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Táborový handbook',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    sidebarDepth: 1,
    nav: [
      {
        text: 'Handbook',
        link: '/handbook/',
      },
      {
        text: 'Config',
        link: '/config/'
      },
      {
        text: 'VuePress',
        link: 'https://v1.vuepress.vuejs.org'
      }
    ],
    sidebar: {
      '/handbook/':   [                                                   //getSideBar('priprava-tabora', 'Příprava tábora')
        {
          title: 'Handbook',
          colapsable: false,
          children: [
            {
              title: 'Příprava tábora',
              path: '/handbook/priprava-tabora/',
              colapsable: false,
              children: [
                {
                  title: 'Seznam činností před táborem',
                  path: '/handbook/priprava-tabora/seznam-cinnosti-pred-taborem'
                },
                {
                  title: 'Žádosti o povolení tábora',
                  path: '/handbook/priprava-tabora/zadosti-o-povoleni-tabora'
                },
              ]
            },
            {
              title: 'Tábor',
              path: '/handbook/tabor/',
              colapsable: false,
              children: [
              ]
            },
            {
              title: 'Po táboře',
              path: '/handbook/po-tabore/',
              colapsable: false,
              children: [
              ]
            },
          ]
        }
      ]         
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}

/*
function getSideBar(folder, title) {
  const extension = [".md"];

  const files = fs
    .readdirSync(path.join(`${__dirname}/../${folder}`))
    .filter(
      (item) =>
        item.toLowerCase() != "readme.md" &&
        fs.statSync(path.join(`${__dirname}/../${folder}`, item)).isFile() &&
        extension.includes(path.extname(item))
    );

  return [{ title: title, children: ["", ...files] }];
  
}
*/