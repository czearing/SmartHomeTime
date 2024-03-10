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
import { AppProvider } from "../context";
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
  const userTheme = useGetLocal("theme");

  // 2. Check whether the browser is using dark mode or light mode
  const isDarkTheme = useThemeDetector();

  // 3. Callback function for returning the current theme for the components.
  const findTheme = React.useCallback(
    (theme: string) => {
      switch (theme) {
        case "system":
          return isDarkTheme ? webDarkTheme : webLightTheme;
        case "dark":
          return webDarkTheme;
        default:
          return webLightTheme;
      }
    },
    [isDarkTheme]
  );

  // 4. Initialize the current theme
  const [theme, setTheme] = React.useState(findTheme(userTheme));

  // 5. Update the current theme when the os theme changes or local storage updates
  React.useEffect(() => {
    setTheme(findTheme(userTheme));
  }, [isDarkTheme, findTheme, userTheme]);

  React.useEffect(() => {
    setIsMounted(true);
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
          <AppProvider value={{ setTheme, findTheme }}>
            {isMounted && (
              <FluentProvider theme={theme} style={fluentProviderStyles}>
                <AppContainer>
                  <Component {...pageProps} />
                </AppContainer>
              </FluentProvider>
            )}
          </AppProvider>
        </SSRProvider>
      </RendererProvider>
    </QueryClientProvider>
  );
}
