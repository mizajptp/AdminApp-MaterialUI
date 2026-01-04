
import { Button, styled } from "@mui/material";

export const AddButton = styled(Button)(({theme}) => {
    return{
    color:theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    fontWeight: 600,
    borderRadius:"6px",
    "&:hover" : {
        backgroundColor: theme.palette.secondary.dark,
    },
}
});