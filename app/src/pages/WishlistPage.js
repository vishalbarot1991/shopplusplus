import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useWishlist } from "../context/wishlist";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import "../styles/WishlistStyle.css";

const WishlistPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [wishlist, setWishlist] = useWishlist();

  //delete  item
  const removeWishlistItem = (pid) => {
    try {
      let myWishlist = [...wishlist];
      let index = myWishlist.findIndex((item) => item._id === pid);
      myWishlist.splice(index, 1);
      setWishlist(myWishlist);
      localStorage.setItem("wishlist", JSON.stringify(myWishlist));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className=" cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {wishlist?.length
                  ? `You Have ${wishlist.length} items in your wishlist ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Wishlist Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
              {wishlist?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)} </p>
                    <p>Price : {p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeWishlistItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;
