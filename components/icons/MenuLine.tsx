import * as React from "react"
import { SVGProps, memo } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width={19} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M.648 0h18v2h-18V0Zm0 7h12v2h-12V7Zm0 7h18v2h-18v-2Z" fill="#3E4095" />
  </svg>
)

const MenuLine = memo(SvgComponent)
export default MenuLine
