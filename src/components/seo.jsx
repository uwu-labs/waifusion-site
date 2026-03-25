import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import * as siteConfig from "../siteConfig";

function SEO({ description, lang, meta, title }) {
  const { pathname, search } = useLocation();
  const metaDescription = description || siteConfig.siteDesc;
  const pageTitle = `${title} | ${siteConfig.siteTitle}`;
  const pageUrl = `${siteConfig.siteUrl}${pathname}${search}`;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteConfig.siteTitle}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: pageTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: pageUrl,
        },
        {
          property: `og:image`,
          content: `${siteConfig.siteUrl}/icons/icon-512x512.png`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: siteConfig.siteAuthor,
        },
        {
          name: `twitter:title`,
          content: pageTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: `${siteConfig.siteUrl}/icons/icon-512x512.png`,
        },
      ].concat(meta)}
      link={[{ rel: "canonical", href: pageUrl }]}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
