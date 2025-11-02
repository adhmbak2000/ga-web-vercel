//# navigation
interface LinkType {
    href: string
    label: string
    icon?:ReactNode
    children?: LinkType[]
}