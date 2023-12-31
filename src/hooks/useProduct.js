import { useSelector } from 'react-redux'

export const useProduct = () => {
    const homePageProducts = useSelector(
        (state)=> state.product.homePageProducts
    )

    const isLoading = useSelector((state)=>state.product.loading)

    const productCategories = useSelector(
      (state) => state.product.productCategories
    )

      const categoryProducts = useSelector(
        (state)=> state.product.categoryProducts
      )

  const totalPages = useSelector((state)=>state.product.totalPages)

    const selectedProduct = useSelector((state)=> state.product.selectedProduct)
  return {
    homePageProducts,
    selectedProduct,
    productCategories,
    isLoading,
    categoryProducts,
    totalPages
  }
}
