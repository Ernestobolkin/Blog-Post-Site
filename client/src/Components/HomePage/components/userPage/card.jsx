import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AddComment } from "./addComment/addComment";
import { LogOutContext } from "../../../../App/context/context";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({
  id,
  date,
  content,
  title,
  children,
  getData,
}) {
  const [expanded, setExpanded] = useState(false);
  const { isLoggedIn } = useContext(LogOutContext);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="card">
      <CardHeader title={`${title}`} subheader={`${date}`} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {children}
          {isLoggedIn && <AddComment id={id} getData={getData} />}
        </CardContent>
      </Collapse>
    </Card>
  );
}
