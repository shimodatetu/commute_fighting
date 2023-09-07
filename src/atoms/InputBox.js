import * as React from 'react'
import { useState } from "react"
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';

const InputBox = () => {


    return (
        <div>



            <TextField
                type="text"
                placeholder="金額"
                variant="outlined"
                sx={{ bgcolor: 'white', color: 'black', boxShadow: 0, borderColor: 'black', height: 55, borderRadius: 3, mt: 3, mb: 2, width: '79%', marginTop: 1 }}

                // value={num}
                InputProps={{
                    style: {
                        borderRadius: "10px",
                    },
                    inputProps: {
                        style: { textAlign: "center", fontSize: 25, padding: 10 },
                    },
                    endAdornment: <InputAdornment position="end"  >円</InputAdornment>
                }}
            />
        </div>
    )
}

export default InputBox;