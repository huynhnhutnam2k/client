import { getAllProduct } from "app/productSlice";
import { Pro } from "components/product";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import LoadingSkeleton from "components/loading/loadingSkeleton";
const HomeLatest = () => {
  const { products, isLoading } = useSelector((state) => state.product);
  const { isMobile } = useSelector((state) => state.stateDevide);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProduct(4));
  }, [dispatch]);
  return (
    <div className="my-20 container">
      <div className="text-center text-[50px] font-bold uppercase text-black ">
        Sản phẩm mới nhất
      </div>
      {isLoading ? (
        new Array(4)
          .fill(0)
          .map(() => <LoadingSkeleton key={v4()}></LoadingSkeleton>)
      ) : (
        <>
          <div
            className={`overflow-hidden grid ${
              isMobile ? "grid-cols-2" : "grid-cols-4"
            } gap-2`}
          >
            {products?.map((item) => (
              <Pro item={item}></Pro>
            ))}
          </div>
          <Link
            to="/products"
            className="mx-auto text-center block my-4 uppercase w-[120px] p-2 border-2 border-black bg-[#000] text-[#fff] hover:bg-[#fff] hover:text-[#000] duration-200"
          >
            Xem thêm
          </Link>
        </>
      )}
    </div>
  );
};

export default HomeLatest;
