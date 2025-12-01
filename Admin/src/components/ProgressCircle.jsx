/* eslint-disable react/prop-types */
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressCircle = ({ progress = 0.75, size = "40" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Ensure progress is between 0 and 1
  const normalizedProgress = Math.min(Math.max(typeof progress === 'string' ? parseFloat(progress) : progress, 0), 1);
  const angle = normalizedProgress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
            ${colors.greenAccent[500]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
