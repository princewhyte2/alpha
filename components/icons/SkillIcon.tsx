import * as React from "react"
import { SVGProps, memo } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width={32} height={31} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M31.612 10.771A16 16 0 1 0 9.826 30.757l4.284-9.2a5.852 5.852 0 1 1 7.969-7.31l9.533-3.476Z"
      fill="#3E4095"
    />
  </svg>
)

const SkillIcon = memo(SvgComponent)
export default SkillIcon
