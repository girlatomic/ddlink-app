import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import IconButton from "@mui/material/IconButton";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import "./CardNav.css";

const CardNav = () => {
  return (
    <div className="card-nav">
      <Link to="/settingspage">
        <IconButton>
          <DisplaySettingsIcon
            color="primary"
            fontSize="large"
            className="header__icon"
          />
        </IconButton>
      </Link>
      <Link to="/settingspage">
        <IconButton>
          <FavoriteIcon
            color="secondary"
            fontSize="large"
            className="header__icon"
          />
        </IconButton>
      </Link>
      <Link to="/chatpage">
        <IconButton>
          <ForumRoundedIcon
            color="primary"
            fontSize="large"
            className="header__icon"
          />
        </IconButton>
      </Link>
    </div>
  );
};

export default CardNav;
