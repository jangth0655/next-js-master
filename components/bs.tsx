// import를 최상단에서 늘 하던식으로 하면 유저의 브라우저는 모든 컴포넌트를 다운 받는다.

console.log("hello BS in outside");

export default function Bs() {
  console.log("hello BS");

  return <h1>Hello</h1>;
}
