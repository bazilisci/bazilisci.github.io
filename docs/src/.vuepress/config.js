const { description } = require('../../package');
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");


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
        sidebarDepth: 2,
        nav: [
            {
                text: 'Handbook',
                link: '/handbook/',
            },

        ],
        sidebar: {
            '/handbook/': [                                                   //getSideBar('priprava-tabora', 'Příprava tábora')
                {
                    title: 'Handbook',
                    children: getSidebar('handbook')
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



function getSidebar(folder) {
    var entries = [];
    var dirent = fs.readdirSync(getPath(folder), { withFileTypes: true });

    for (var i = 0, _len = dirent.length; i < _len; i++) {
        if (dirent[i].name.toLocaleLowerCase() == 'readme.md') {
            continue;
        }
        var meta;
        if (dirent[i].isDirectory()) {
            meta = getMeta(`/${folder}/${dirent[i].name}/README.md`, dirent[i].name)
            entries.push({
                title: meta.title,
                order: meta.order,
                path: `/${folder}/${dirent[i].name}/`,
                children: getSidebar(`${folder}/${dirent[i].name}`)
            });
        } else if (dirent[i].isFile()) {
            var nameBase = dirent[i].name.replace(/\.[^/.]+$/, "");
            meta = getMeta(`/${folder}/${dirent[i].name}`, nameBase);

            entries.push({
                title: meta.title,
                order: 5,
                path: `/${folder}/${nameBase}`,
            });
        }
    }
    entries.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0)); 
    //console.log(entries);
    return entries
}

function getPath(fName) {
    return path.join(`${__dirname}/../${fName}`)
}

function kebabToTitle(str) {
    str = str.replace(/-/g, ' ');
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function getMeta(filePath, kebabAlt) {
    var fileData = matter.read(getPath(filePath)).data;
    fileData.title = fileData.title ? fileData.title : kebabToTitle(kebabAlt);
    return fileData
}