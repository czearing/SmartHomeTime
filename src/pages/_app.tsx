import * as React from "react";
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  tokens,
} from "@fluentui/react-components";
import { SSRProvider } from "@fluentui/react-utilities";
import { useLocalDefault, useThemeDetector, useGetLocal } from "../utils";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RendererProvider, createDOMRenderer } from "@griffel/react";
import { AppContainer } from "../components";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../clients";

const fluentProviderStyles = {
  height: "100%",
  backgroundColor: tokens.colorNeutralBackground2,
};

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [isMounted, setIsMounted] = React.useState(false);

  // 1. Get the default theme from local storage.
  useLocalDefault("theme", "system");

  const [theme, setTheme] = React.useState(webLightTheme);

  React.useEffect(() => {
    setIsMounted(true);

    const updateThemeBasedOnTime = () => {
      const now = new Date();
      const hour = now.getHours();

      // Switch to dark theme after 7 PM and before 7 AM
      if (hour >= 19 || hour < 7) {
        setTheme(webLightTheme);
      } else {
        setTheme(webLightTheme);
      }
    };

    // Calculate the milliseconds until the next hour to align theme updates
    const now = new Date();
    const msUntilNextHour =
      (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000;
    const timeoutId = setTimeout(() => {
      updateThemeBasedOnTime();

      // After the first timeout, set an interval to update the theme every hour
      setInterval(updateThemeBasedOnTime, 3600000);
    }, msUntilNextHour);

    updateThemeBasedOnTime();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>My Status</title>
        <meta name="title" content="My Status" />
        <meta
          name="description"
          content="A site that showcases various statuses such as Team's presence."
        />
        <link rel="icon" type="image/svg+xml" href="/image/favicon.svg" />
      </Head>
      <style jsx global>{`
        body {
          background-color: ${theme.colorNeutralBackground1};
          padding: 0px;
          margin: 0px;
          height: 100%;
          overflow: hidden;
        }
        html {
          height: 100%;
        }
        #__next {
          height: 100%;
        }
      `}</style>
      <RendererProvider renderer={pageProps.renderer || createDOMRenderer()}>
        <SSRProvider>
          {isMounted && (
            <FluentProvider theme={theme} style={fluentProviderStyles}>
              <AppContainer>
                <Component {...pageProps} />
              </AppContainer>
            </FluentProvider>
          )}
        </SSRProvider>
      </RendererProvider>
    </QueryClientProvider>
  );
}
