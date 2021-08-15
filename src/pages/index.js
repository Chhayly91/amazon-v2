import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/client";
import Footer from "../components/Footer";

export default function Home({ products }) {
  // console.log(typeof products);
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazone v2</title>
        <meta name="description" content="amazone v2" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />

        {/* Product feeds */}
        <ProductFeed products={products} />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  //get Data from Fake Store API
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return {
    props: { products, session }, // will be passed to the page component as props
  };
}
