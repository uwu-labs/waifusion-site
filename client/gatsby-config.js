const config = require('./config');

module.exports = {
    siteMetadata: {
        title:          config.siteTitle,
        description:    config.siteDesc,
        author:         config.siteAuthor,
        logoUrl:        config.siteLogoUrl,
        menuLinks:[
            {
                name:'HOME',
                link:'/'
            },
            {
                name:'OVERVIEW',
                link:'/overview'
            },
            {
                name:'GALLERY',
                link:'/app/gallery'
            },
            {
                name:'WET TOKEN',
                link:'/wet'
            },
            {
                name:'MY WALLET',
                link:'/app'
            },
            {
                name:'MY HISTORY',
                link:'/app/transaction-history'
            },
            // {
            //     name:'Provenance',
            //     link:'/app/provenance'
            // },
            {
                name:'PROVENANCE',
                link: '/provenance'
            }
        ],
    },

    pathPrefix: config.pathPrefix,

    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-create-client-paths`,
            options: {prefixes: [`/app/*`]},
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name:               config.manifestName,
                short_name:         config.manifestShortName,
                start_url:          config.pathPrefix || config.manifestStartUrl,
                background_color:   config.manifestBackgroundColor,
                theme_color:        config.manifestThemeColor,
                display:            config.manifestDisplay,
                icon:               config.manifestIcon, // This path is relative to the root of the site.
            },
        },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
              rule: {
                include: /assets/ // See below to configure properly
              }
            }
          },
        `gatsby-plugin-lodash`,
        `gatsby-plugin-netlify`,

        // // this (optional) plugin enables Progressive Web App + Offline functionality
        // // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
        `gatsby-plugin-preload-fonts`
    ],
};
