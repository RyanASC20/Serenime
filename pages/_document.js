import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="A tool to help you combat stress. Serenime offers a stress and mood tracker, goal tracker, guided breathing exercises, and a daily planner!"></meta>
          
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-XKWC5VHC4D"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());
              gtag('config', 'G-XKWC5VHC4D');
              `
            }}
          >
          </script>
        </Head>
        <body className="dark">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument