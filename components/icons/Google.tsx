import * as React from "react"
import { SVGProps, memo } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width={25} height={25} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M22.654 10.541h-.805V10.5h-9v4H18.5a5.998 5.998 0 0 1-11.651-2 6 6 0 0 1 6-6c1.53 0 2.92.577 3.98 1.52l2.829-2.829a9.954 9.954 0 0 0-6.81-2.691c-5.522 0-10 4.478-10 10 0 5.523 4.478 10 10 10 5.523 0 10-4.477 10-10 0-.67-.068-1.325-.194-1.959Z"
      fill="#FFC107"
    />
    <path
      d="m4.001 7.846 3.286 2.409A5.997 5.997 0 0 1 12.848 6.5c1.53 0 2.921.577 3.981 1.52l2.828-2.829A9.954 9.954 0 0 0 12.848 2.5a9.994 9.994 0 0 0-8.847 5.346Z"
      fill="#FF3D00"
    />
    <path
      d="M12.849 22.5c2.583 0 4.93-.988 6.704-2.596l-3.095-2.619a5.955 5.955 0 0 1-3.61 1.215 5.997 5.997 0 0 1-5.64-3.973L3.945 17.04c1.655 3.238 5.016 5.46 8.903 5.46Z"
      fill="#4CAF50"
    />
    <path
      d="M22.654 10.541h-.805V10.5h-9v4H18.5a6.02 6.02 0 0 1-2.043 2.785h.001l3.095 2.619c-.219.198 3.296-2.404 3.296-7.404 0-.67-.07-1.325-.195-1.959Z"
      fill="#1976D2"
    />
  </svg>
)

const GoogleIcon = memo(SvgComponent)
export default GoogleIcon
