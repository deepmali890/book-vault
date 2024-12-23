import { FaEye, FaOpencart, FaRegHeart, FaStar } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import { useRouter } from "next/navigation";
import { IoIosCart } from "react-icons/io";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Card = ({ product, filePath }) => {
  const router = useRouter();

  // Handle navigation to product details
  const handleProductDetails = () => {

    const cookiedata = Cookies.get("book_vault");

    if (!cookiedata) {
      // Show an error message if the cookie is not present
      return Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You must be logged in to view product details.",
      });
    }

    // Navigate to the product details page if the cookie is present
    router.push(`/book/book_dateils/${product._id}`);
  };

  return (
    <div
      onClick={handleProductDetails}
      className="relative group mb-20 ms-10 w-full overflow-hidden rounded-xl border-t-2 bg-white shadow-xl"
    >
      {/* Product Image */}
      <img
        className="h-60 rounded-t-lg scale-95 cursor-pointer hover:scale-105 duration-[0.5s] mx-auto object-cover"
        src={filePath + product.frontimg}
        alt={product.name}
      />

      {/* Category Tag */}
      <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">
        {product.book_category.name}
      </span>

      {/* Product Details */}
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-slate-900">
          {product.name}
        </h5>

        {/* Rating */}
        <div className="mt-2.5 mb-5 flex items-center">
          <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
            5.0
          </span>
          <div className="flex gap-1">
            {Array(5)
              .fill()
              .map((_, index) => (
                <GoStarFill key={index} className="text-yellow-400" />
              ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="flex my-2 items-center justify-between">
          <p>
            <span className="text-2xl font-bold text-slate-900">
              ₹ {product.price}
            </span>
            <span className="text-md ms-2 text-slate-900 line-through">
              ₹ {product.mrp}
            </span>
          </p>
        </div>

        {/* Add to Cart Button */}
        <div className="flex items-center justify-center cursor-pointer gap-3 rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white text-center hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
          <IoIosCart />
          Add To Cart
        </div>
      </div>
    </div>
  );
};

export default Card;
