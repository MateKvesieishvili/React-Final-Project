import react from "react";
import { Input } from "../atoms";
import { useTranslation } from "react-i18next";

export const Searchbar = ()=>{
    const {t} = useTranslation()
    return(
        <div>
            <Input sx={{
                selfAlign: "center",
                width:"634px",
                height:"64px"
            }} label={t("search_bar")}/>
        </div>
    );
};