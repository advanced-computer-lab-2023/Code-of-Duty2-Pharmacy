import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import asal from "../../assets/as.png";
interface Props {}

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
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
  };
}
const ChatPerson: React.FC<Props> = () => {
  return (
    <div>
      <Button
        // startIcon={<Avatar {...stringAvatar("AbdelRahman Saleh")} />}
        startIcon={<Avatar src={asal} />}
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "70vw",
          justifyContent: "flex-start",
          textTransform: "none",
          "& .MuiBadge-root , & .righttt": {
            marginLeft: "auto"
          }
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1 }}>
          <Typography variant="button" display="block" textTransform="none">
            AbdelRahman Saleh
          </Typography>
          <Typography variant="body2" color="textSecondary" display="block">
            Hello Dr Ahmed, I have a question about the dosage of the medicine I am taking.
          </Typography>
        </div>
        <Typography className="righttt" variant="body2" style={{ marginLeft: "auto", paddingRight: "2.0rem" }}>
          12:45 PM
        </Typography>
        <Badge
          color="secondary"
          badgeContent={1}
          max={99}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
        />
      </Button>
    </div>
  );
};

export default ChatPerson;
