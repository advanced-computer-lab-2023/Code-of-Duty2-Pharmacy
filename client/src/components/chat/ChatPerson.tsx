import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import asal from "../../assets/as.png";
interface Props {
  name: string;
  lastmessage?: string;
  time?: string;
  unread?: number;
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  if (typeof name !== "string") {
    return;
  }
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(" ")[0][0]}${
      name.split(" ").length > 1 ? name.split(" ")[1][0] : name.split(" ")[0].length > 1 ? name.split(" ")[0][1] : ""
    }`.toUpperCase()
  };
}
const ChatPerson: React.FC<Props> = ({ name, lastmessage, time, unread }) => {
  return (
    <div style={{ display: "block" }}>
      <Button
        startIcon={name === "AbdelRahman Saleh" ? <Avatar src={asal} /> : <Avatar {...stringAvatar(name)} />}
        // startIcon={<Avatar {...stringAvatar("AbdelRahman Saleh")} />}
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "70vw",
          borderRadius: "8px",
          justifyContent: "flex-start",
          textTransform: "none",
          "& .MuiBadge-root , & .righttt": {
            marginLeft: "auto"
          }
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1 }}>
          <Typography variant="button" display="block" textTransform="none">
            {name}
          </Typography>
          {name !== undefined && (
            <Typography variant="body2" color="textSecondary" display="block">
              {lastmessage}
            </Typography>
          )}
        </div>
        {time !== undefined && (
          <Typography className="righttt" variant="body2" style={{ marginLeft: "auto", paddingRight: "2.0rem" }}>
            {time}
          </Typography>
        )}
        {unread !== undefined && (
          <Badge
            color="secondary"
            badgeContent={unread}
            max={99}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            sx={{ marginRight: "0.4rem" }}
          />
        )}
      </Button>
    </div>
  );
};

export default ChatPerson;
