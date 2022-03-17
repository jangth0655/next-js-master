// Server Component

import { Suspense } from "react";

// 서버에서 렌더링 되고있는 중...
function List() {
  throw new Promise((resolve) => null);
  return <ul>xxx</ul>;
}

export default function Coins() {
  return (
    <div>
      <h1>Welcome to RSC</h1>
      <Suspense fallback="Rendering in the server..">
        <List />
      </Suspense>
    </div>
  );
}
