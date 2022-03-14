import "./error.style.scss";
import React, { forwardRef } from "react";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorMsg = ({ string, setMsg, type ,time }) => {
  const renderString = () => {
    setTimeout(() => {
      setMsg(false);
    }, time || 2000 );
    return (
      <>
        <div className="container">
          <Alert severity={type} sx={{ width: "100%" }}>
            {string}
          </Alert>
        </div>
      </>
    );
  };

  return <>{renderString()}</>;
};
