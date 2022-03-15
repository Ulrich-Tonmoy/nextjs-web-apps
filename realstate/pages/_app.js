import { ChakraProvider } from "@chakra-ui/react";
import Router from "next/router";
import Head from "next/head";
import NProgress from "nprogress";
import Layout from "../components/Layout";
import theme from "../theme.js";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head></Head>
            <ChakraProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </>
    );
}

export default MyApp;
