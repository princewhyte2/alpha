import * as React from "react"
import { SVGProps, memo } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width={25} height={25} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)">
      <path
        d="M24.849 12.5c0-6.627-5.373-12-12-12-6.628 0-12 5.373-12 12 0 5.99 4.388 10.954 10.125 11.854V15.97H7.927V12.5h3.047V9.856c0-3.007 1.791-4.668 4.532-4.668 1.313 0 2.686.234 2.686.234v2.953H16.68c-1.49 0-1.955.925-1.955 1.874V12.5h3.328l-.532 3.469h-2.796v8.385c5.736-.9 10.125-5.864 10.125-11.854Z"
        fill="#1877F2"
      />
      <path
        d="m17.52 15.969.532-3.469h-3.328v-2.25c0-.95.464-1.875 1.955-1.875h1.513V5.422s-1.373-.234-2.686-.234c-2.74 0-4.532 1.66-4.532 4.668V12.5H7.927v3.469h3.047v8.385a12.087 12.087 0 0 0 3.75 0V15.97h2.796Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" transform="translate(.849 .5)" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)

const FacebookIcon = memo(SvgComponent)
export default FacebookIcon
