import Image from "next/image";
import Header from "../components/Header";
import checkout from "../../public/check_out.jpg";
import { useSelector } from "react-redux";
import { selectItems, totalItems } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const items = useSelector(selectItems);
  const [session] = useSession();
  const totalItem = useSelector(totalItems);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    //call Backend to create checkout session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    //Redirect user/customer to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-xl mx-auto">
        {/* left section */}
        <div>
          <div>
            <Image
              src={checkout}
              width={1020}
              height={154}
              objectFit="contain"
              alt=""
            />
          </div>

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is Empty"
                : "Shopping Basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>
        {/* right section */}

        {items.length > 0 && (
          <div className="bg-white p-10 mx-2.5 flex flex-col">
            <h2 className="whitespace-nowrap font-semibold text-lg">
              Subtotal ({items.length} items):
              <span className="font-bold ml-1">{`$${totalItem.toFixed(
                2
              )}`}</span>
            </h2>

            <button
              onClick={createCheckoutSession}
              role="link"
              disabled={!session}
              className={`button mt-2 ${
                !session &&
                "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              {!session ? "Signin to Checkout" : "Proceed to Checkout"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Checkout;
