import React, { useState } from 'react'

export const useAlert = () => {
  const [alertState, setAlertState] = useState({
    open: "false",
    message: "",
    severity: "success"
  })

  const showAlert = (message,severity)=>{
    setAlertState((prev)=>({
        ...prev,
        open:true,
        message,
        severity,
    }))
  }

  const handleClose = ()=>{
    setAlertState((prev)=>({
        ...prev,
        open:false,
        message: "",
        severity: ""
    }))
  }

  return {
    alertState,
    showAlert,
    handleClose
  }
}
