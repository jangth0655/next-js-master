import UserUser from "@libs/client/useUser";
import { Fav, Product } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import useSWR, { SWRConfig } from "swr";
import FloatingButton from "../components/floating-button";
import Item from "../components/item";
import Layout from "../components/layout";
import client from "@libs/server/client";

export interface ProductWithFavs extends Product {
  //favs: Fav;
  _count: {
    favs: number;
  };
}

interface ProductsResponse {
  ok: boolean;
  product: ProductWithFavs[];
}

const Home: NextPage = () => {
  const { user, isLoading } = UserUser();
  const { data } = useSWR<ProductsResponse>("/api/products");

  return (
    <Layout seoTitle="Home" hasTabBar>
      <div className=" flex flex-col space-y-5 ">
        {data?.product?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            title={product.name}
            price={product.price}
            comments={1}
            hearts={product?._count?.favs || 0}
          />
        ))}

        <FloatingButton href="/products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

const Page: NextPage<{ products: ProductWithFavs }> = ({ products }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/products": {
            ok: true,
            products,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
};

export async function getServerSideProps() {
  const products = await client.product.findMany({});

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default Page;
