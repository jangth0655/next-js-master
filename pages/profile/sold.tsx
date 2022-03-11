import ProductList from "@components/product-list";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import { ProductWithFavs } from "pages";
import useSWR from "swr";
import Item from "../../components/item";
import Layout from "../../components/layout";

const Sold: NextPage = () => {
  return (
    <Layout title="판매내역" canGoBack>
      <div className="flex flex-col space-y-5 divide-y  pb-10">
        <ProductList kind="sales"></ProductList>
      </div>
    </Layout>
  );
};

export default Sold;
