import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import IconButton from "@mui/material/IconButton";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <Link to="/settingspage">
        <IconButton>
          <DisplaySettingsIcon
            color="primary"
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

export default Header;
