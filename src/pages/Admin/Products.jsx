import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  // GET ALL PRODUCTS
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  style={
                    ({ objectFit: "cover" },
                    { width: "100%" },
                    {
                      height: "40vh",
                    })
                  }
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{p.name}</h5>
                  {/* <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p> */}
                  {/* <p className="card-text"> $ {p.price}</p> */}
                  {/* <button class="btn btn-primary ms-1">More Details</button> */}
                  {/* <button class="btn btn-secondary ms-1">ADD TO CART</button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
