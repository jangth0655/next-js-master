import Document, { Head, Html, Main, NextScript } from "next/document";

// 앱이 제대로 작동하기 위해서 필수로 필요한 컴포턴트들이다.
class CustomDocument extends Document {
  render(): JSX.Element {
    console.log("document is running");
    return (
      <Html lang="ko">
        <Head>
          {/* 
            빌드 할때 NextJS가 Link 태그에 있는 주소로 가서 유저가 다운로드 해야하는 파일을
            변환하고 대체해준다. - NextJS가 대신 다운로드해줘서 모든 페이지에 포함 시킨다.
            
            따라서 유저가 추가적으로 다운로드 할 필요가 없기때문에 로딩 속도가 빨라진다.
          */}
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          {/* Main 안에서는 앱 컴포넌트를 렌더링해준다.*/}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;

// document 와 앱 컴포넌트의 차이는
// 앱 컴포넌트 - 유저가 페이지를 불러올 때마다 브라우저에서 실행 된다.
// 도큐먼트 컴포넌트 - 서버에서 한번만 실행된다, NextJS 앱의 Html 뼈대를 짜주는 역할을 한다.
