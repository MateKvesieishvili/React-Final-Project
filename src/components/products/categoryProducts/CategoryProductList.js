import React, { useEffect } from "react";
import { LoadingWrapper } from "../../atoms";
import { useProduct } from "../../../hooks/useProduct";
import { Box } from "@mui/material";
import { GridContainer, ProductCards } from "../shared";
import { Sort } from "./Sort";
import { Paginate } from "./Paginate";
import { useDispatch } from "react-redux";
import { fetchCategoryProducts } from "../../../redux";
import { useParams } from "react-router-dom";
import { useQueryParams } from "../../../hooks";

export const CategoryProductList = () => {
  const { isLoading, categoryProducts, totalPages } = useProduct();
  const dispatch = useDispatch();
  const { categoryName } = useParams();
  const { value: page, changeQueryValue: changePage } = useQueryParams("page");
  const { value: sort, changeQueryValue: changeSort } = useQueryParams("sort", "defaultSort");

  useEffect(() => {
    dispatch(
      fetchCategoryProducts({
        categoryName,
        queryUrl: `?size=15&sort=${sort}&page=${Number(page)}`,
      })
    );
  }, [categoryName, dispatch, page, sort]);

  useEffect(() => {
    changePage("page", 1);
  }, [sort]);

  return (
    <LoadingWrapper isLoading={isLoading}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          marginTop: "100px",
        }}
      >
        <Sort value={sort} changeSort={changeSort} />
        <GridContainer>
          {categoryProducts.map((product) => {
            return <ProductCards key={product.id} product={product} />;
          })}
        </GridContainer>
        <Paginate totalPages={totalPages} currentPage={page} changePage={changePage} />
      </Box>
    </LoadingWrapper>
  );
};