import React, { useEffect, useState } from "react";
import { Box, Autocomplete, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import { InputField, Link, LoadingWrapper, Text } from "../atoms";
import InputAdornment from '@mui/material/InputAdornment';
import { useDebounce, useFetchData } from "../../hooks";

export const Searchbar = () => {
  const { t } = useTranslation();
  const StyledImage = styled("img")(()=>({
    width: 50, 
    height: 50,
    objectFit: "cover"
  }))
  const ResultBox = styled(Box)({
    backgroundColor: "#EFF2FF",
    borderRadius: "8px",
    padding: "12px",
    transition: "background-color 0.3s ease",
    '&:hover': {
      backgroundColor: "#F9FAFD",
    },
  });

  const [searchValue, setSearchValue] = useState("")
  const {getData, loading, data, setState} = useFetchData()
  const {products} = data || []
  const debouncedSearchValue = useDebounce(500, searchValue)

  useEffect(()=>{
    if(!debouncedSearchValue){
        setState((prev)=> ({...prev, data: null}))
    } else {
        getData(`/products/search?name=${debouncedSearchValue}`)
        console.log("Sent Request")
    }
  }, [debouncedSearchValue, getData, setState])
  return (
        <Autocomplete
            freeSolo
            options={products || []}
            getOptionLabel={(option)=> option.name}
            renderOption={(_, option)=>{
                const {name, category, _id, price, image, brand} = option
                return (
            <LoadingWrapper isLoading={loading}>
                <Link to={`/products/categories/${category}/${_id}`} key={_id}>
                    <ResultBox sx={{display:"flex", gap:"40px", marginTop: "5px"}}>
                        <StyledImage src={image} alt={`${name}-${category}`}/>
                        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                         <Text sx={{
                            fontWeight: "400",
                            color:"#003049"         
                        }}>{name}</Text>
                         <Text sx={{
                            fontWeight: "200",
                            color:"#003049"         
                         }}>{brand}</Text>
                         <Text sx={{
                             color: "#6C6C6C"
                            }}>${price}</Text>
                         <Text sx={{
                            color: "#6C6C6C"
                         }}>{category}</Text>
                        </Box>
                    </ResultBox>
                </Link>
             </LoadingWrapper>
 )
}}
            renderInput={(params)=>{
                    return (<InputField
                    {...params} 
                    value={searchValue}
                    onChange={(e)=>{setSearchValue(e.target.value)}}
                    InputProps={{
                        ...params.InputProps,
                        type: "search"
                    }}
                    sx={{
                    marginLeft: 1,
                    flex: 1,
                    width: "645px",
                    height: "64px",
                    variant: "standart",
                    borderRadius: 12,
                    border: "none",
                    outline: "none"
                    }}
                    disableUnderline
                    label={t("search_bar")}
                    />)
            }}
        >
        </Autocomplete>

  );
};
