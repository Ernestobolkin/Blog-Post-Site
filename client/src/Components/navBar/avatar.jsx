import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { LogOutContext } from "../../App/context/context";
import { useContext } from "react";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}`,
  };
}

export default function BackgroundLetterAvatars() {
  const { userName } = useContext(LogOutContext);
  const { isLoggedIn } = useContext(LogOutContext);
  console.log(userName);
  return (
    <Stack direction="row" spacing={2}>
      {isLoggedIn && <Avatar {...stringAvatar(userName || "Guest")} />}
    </Stack>
  );
}
