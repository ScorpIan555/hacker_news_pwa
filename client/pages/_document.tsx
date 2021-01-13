import Document, {
  Head, Html,

  Main,
  NextScript
} from 'next/document';
import { Provider as StyletronProvider } from 'styletron-react';
import { styletron } from '../theme/styletron';


export default class MyDocument extends Document {
  static getInitialProps(props: any) {
    const page = props.renderPage((App) => (props: any) => (
      <StyletronProvider value={styletron}>
        <App {...props} />
      </StyletronProvider>
    ))
    const stylesheets = styletron.getStylesheets() || []
    return { ...page, stylesheets }
  }
  // static async getInitialProps(ctx: DocumentContext) {
  //   const sheet = new ServerStyleSheet();
  //   const originalRenderPage = ctx.renderPage;

  //   try {
  //     ctx.renderPage = () =>
  //       originalRenderPage({
  //         enhanceApp: (App) => (props) =>
  //           sheet.collectStyles(<App {...props} />),
  //       });

  //     const initialProps = await Document.getInitialProps(ctx);
  //     return {
  //       ...initialProps,
  //       styles: (
  //         <>
  //           {initialProps.styles}
  //           {sheet.getStyleElement()}
  //         </>
  //       ),
  //       isServer: ctx.hasOwnProperty('req'),
  //     };
  //   } finally {
  //     sheet.seal();
  //   }
  // }



  render() {


    return (
      <Html>
        <Head>
        {this.props.stylesheets.map((sheet, i) => (
              <style
                className="_styletron_hydrate_"
                dangerouslySetInnerHTML={{ __html: sheet.css }}
                media={sheet.attrs.media}
                data-hydrate={sheet.attrs['data-hydrate']}
                key={i}
              />
            ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
