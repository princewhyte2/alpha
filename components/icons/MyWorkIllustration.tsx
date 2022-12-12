import * as React from "react"
import { SVGProps, memo } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width={142} height={142} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={71} cy={70.809} r={70.282} fill="#F1F1F9" />
    <path
      d="M31.892 29.542a2.46 2.46 0 0 1 2.459-2.459h72.069v76.199H34.351a2.46 2.46 0 0 1-2.46-2.459v-71.28Z"
      fill="#FBFBFB"
    />
    <path fill="#3E4095" d="M37.06 32.614h10.822v10.822H37.06z" />
    <path fill="#BDBDBD" d="M37.831 33.388h9.276v9.276h-9.276z" />
    <path fill="#fff" d="M37.831 33.388h9.276v9.276h-9.276z" />
    <rect x={53.31} y={41.188} width={46.006} height={1.476} rx={0.738} fill="#3E4095" />
    <rect x={60.09} y={38.025} width={39.227} height={1.23} rx={0.615} fill="#3E4095" />
    <rect x={53.31} y={38.025} width={4.868} height={1.23} rx={0.615} fill="#3E4095" />
    <path fill="#3E4095" d="M37.06 49.581h10.822v10.822H37.06z" />
    <path fill="#BDBDBD" d="M37.831 50.355h9.276v9.276h-9.276z" />
    <path fill="#fff" d="M37.831 50.355h9.276v9.276h-9.276z" />
    <rect x={53.31} y={58.154} width={46.006} height={1.476} rx={0.738} fill="#3E4095" />
    <rect x={60.09} y={54.992} width={39.227} height={1.23} rx={0.615} fill="#3E4095" />
    <rect x={53.31} y={54.992} width={4.868} height={1.23} rx={0.615} fill="#3E4095" />
    <path fill="#3E4095" d="M37.06 66.548h10.822V77.37H37.06z" />
    <path fill="#BDBDBD" d="M37.831 67.321h9.276v9.276h-9.276z" />
    <path fill="#fff" d="M37.831 67.321h9.276v9.276h-9.276z" />
    <rect x={53.31} y={75.121} width={46.006} height={1.476} rx={0.738} fill="#3E4095" />
    <rect x={60.09} y={71.959} width={39.227} height={1.23} rx={0.615} fill="#3E4095" />
    <rect x={53.31} y={71.959} width={4.868} height={1.23} rx={0.615} fill="#3E4095" />
    <path fill="#3E4095" d="M37.06 83.515h10.822v10.822H37.06z" />
    <path fill="#BDBDBD" d="M37.831 84.288h9.276v9.276h-9.276z" />
    <path fill="#fff" d="M37.831 84.288h9.276v9.276h-9.276z" />
    <rect x={53.31} y={92.088} width={46.006} height={1.476} rx={0.738} fill="#3E4095" />
    <rect x={60.09} y={88.926} width={39.227} height={1.23} rx={0.615} fill="#3E4095" />
    <rect x={53.31} y={88.926} width={4.868} height={1.23} rx={0.615} fill="#3E4095" />
    <path
      d="M108.605 27.083h3.294c.543 0 .984.44.984.984v91.194a4.278 4.278 0 0 1-4.278-4.277V27.083Z"
      fill="#FBFBFB"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M106.658 105.51H26.335v3.913c0 5.433 4.404 9.838 9.838 9.838h74.562a4.088 4.088 0 0 1-4.077-4.087v-9.664Zm4.087 0v13.751h.002V105.51h-.002Z"
      fill="#FBFBFB"
    />
    <path d="M117.669 30.34a3.252 3.252 0 0 0-2.011-3.009 3.258 3.258 0 0 0-1.247-.248v3.258h3.258Z" fill="#FBFBFB" />
    <path
      d="m104.69 52.234 6.86 5.1 19.66-26.449a4.273 4.273 0 1 0-6.86-5.1l-19.66 26.45ZM100.118 58.386a5.409 5.409 0 0 0-1.054 2.828l-.428 5.785a.492.492 0 0 0 .676.492l5.331-2.175a5.41 5.41 0 0 0 2.298-1.782l4.154-5.588-6.86-5.099-4.117 5.539Z"
      fill="#3E4095"
    />
  </svg>
)

const MyWorkIllustration = memo(SvgComponent)
export default MyWorkIllustration
