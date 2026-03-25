import React, { Suspense, lazy } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import Layout from "./components/layout";
import * as siteConfig from "./siteConfig";

const SplashPage = lazy(() => import("./pages/splash"));
const OverviewPage = lazy(() => import("./pages/overview"));
const GalleryPage = lazy(() => import("./pages/gallery"));
const DungeonPage = lazy(() => import("./pages/dungeon"));
const NotFoundPage = lazy(() => import("./pages/404"));

const Home = lazy(() => import("./app/home"));
const Login = lazy(() => import("./app/login"));
const AppDungeon = lazy(() => import("./app/dungeon"));
const Detail = lazy(() => import("./app/detail"));
const Owner = lazy(() => import("./app/owner"));

function RouteFallback() {
  return (
    <div
      className="route-fallback"
      style={{ minHeight: "30vh" }}
      aria-busy="true"
      aria-label="Loading"
    />
  );
}

function LayoutShell() {
  return (
    <Layout
      menuLinks={siteConfig.menuLinks}
      siteTitle={siteConfig.siteTitle}
    >
      <Helmet>
        <title>{siteConfig.siteTitle}</title>
        <meta name="description" content={siteConfig.siteDesc} />
        <meta itemProp="name" content={siteConfig.siteTitle} />
        <meta property="og:site_name" content={siteConfig.siteTitle} />
        <meta property="og:title" content={siteConfig.siteTitle} />
        <meta property="og:description" content={siteConfig.siteDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteConfig.siteUrl}/`} />
        <meta
          property="og:image"
          content={`${siteConfig.siteUrl}/icons/icon-512x512.png`}
        />
        <meta
          name="keywords"
          content="Waifus, NFT, NFT waifu, opensea, waifu harem, non fungible token"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={siteConfig.siteTitle} />
        <meta property="twitter:description" content={siteConfig.siteDesc} />
        <meta
          name="twitter:image"
          content={`${siteConfig.siteUrl}/icons/icon-512x512.png`}
        />
      </Helmet>
      <Outlet />
    </Layout>
  );
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/wet" element={<Navigate to="/overview" replace />} />
        <Route path="/dungeon" element={<DungeonPage />} />
        <Route path="/" element={<LayoutShell />}>
          <Route index element={<Home />} />
          <Route path="app/login" element={<Login />} />
          <Route
            path="app/transaction-history"
            element={<Navigate to="/" replace />}
          />
          <Route path="app/dungeon" element={<AppDungeon />} />
          <Route path="app/detail/:detailId" element={<Detail />} />
          <Route path="app/owner/:ownerId" element={<Owner />} />
          <Route path="app" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
