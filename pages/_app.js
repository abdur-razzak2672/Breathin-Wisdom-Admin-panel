// import node module libraries
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { Analytics } from '@vercel/analytics/react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'styles/theme.scss';
import 'styles/style.css'
import DefaultDashboardLayout from 'layouts/DefaultDashboardLayout';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pageURL = process.env.baseURL + router.pathname;
  const title = "Wisdom";
  const description = "Dash is a fully responsive and yet modern premium Nextjs template & snippets. Geek is feature-rich Nextjs components and beautifully designed pages that help you create the best possible website and web application projects. Nextjs Snippet "
  const keywords = "Breathin Wisdom, Nextjs, Next.js, Course, Sass, landing, Marketing, admin themes, Nextjs admin, Nextjs dashboard, ui kit, web app, multipurpose"

   const Layout = Component.Layout || (router.pathname.includes('dashboard') ?
    (router.pathname.includes('instructor') || router.pathname.includes('student') ?
      DefaultDashboardLayout : DefaultDashboardLayout) : DefaultDashboardLayout)

  return (
    <SSRProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={pageURL}
        openGraph={{
          url: pageURL,
          title: title,
          description: description,
          site_name: "next js admin pannel"
        }}
      />
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
        <Analytics />
      </Layout>
    </SSRProvider>
  )
}

export default MyApp
