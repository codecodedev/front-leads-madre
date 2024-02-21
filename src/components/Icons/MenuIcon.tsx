import { IconSvgProps } from "@/types/general";

export const MenuIcon: React.FC<IconSvgProps> = ({ size = 36, color }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      color={color}
      strokeWidth="0"
      viewBox="0 0 512 512"
      height={size + "px"}
      width={size + "px"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path>
    </svg>
  );
};