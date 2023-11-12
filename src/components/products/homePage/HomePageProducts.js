import React from 'react'
import { useProduct } from '../../../hooks'
import { LoadingWrapper } from '../../atoms'
import { GridContainer } from '../shared/GridContainer'
import {ProductCards} from "../shared"

export const HomePageProducts = () => {
    const {homePageProducts, isLoading} = useProduct()
 
  return (
    <GridContainer>
        <LoadingWrapper isLoading={isLoading}>
            {homePageProducts.map((product)=>(
            <ProductCards key={product._id} product={product} />
            ))}
        </LoadingWrapper>
    </GridContainer>
  )
}
