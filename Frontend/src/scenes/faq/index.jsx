import { Box, useTheme } from "@mui/material";
import Header from "../../components/AdminHeader";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (<Box m ="20px">
        <Header title= "FAQ" subtitle = "Frequently Asked Question Page"/>
        <Accordion defaultExpanded>
            <AccordionSummary expandIcon = {<ExpandMoreIcon/>}> 
                <Typography color = {colors.greenAccent[500]} variant ="h5"> 
                    An Important Question
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography> 
                    Enter text here to show what to add.
                </Typography>
            </AccordionDetails>
        </Accordion>


        <Accordion defaultExpanded>
            <AccordionSummary expandIcon = {<ExpandMoreIcon/>}> 
                <Typography color = {colors.greenAccent[500]} variant ="h5"> 
                    An Important Question
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography> 
                    Enter text here to show what to add.
                </Typography>
            </AccordionDetails>
        </Accordion>


        <Accordion defaultExpanded>
            <AccordionSummary expandIcon = {<ExpandMoreIcon/>}> 
                <Typography color = {colors.greenAccent[500]} variant ="h5"> 
                    An Important Question
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography> 
                    Enter text here to show what to add.
                </Typography>
            </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
            <AccordionSummary expandIcon = {<ExpandMoreIcon/>}> 
                <Typography color = {colors.greenAccent[500]} variant ="h5"> 
                    An Important Question
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography> 
                    Enter text here to show what to add.
                </Typography>
            </AccordionDetails>
        </Accordion>
        </Box>
    );
};

export default FAQ;