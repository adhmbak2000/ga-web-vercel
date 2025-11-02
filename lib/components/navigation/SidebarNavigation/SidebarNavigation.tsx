import {
    List,
    ListProps,
    NavLinkProps,
    ScrollArea
} from "@mantine/core";
import RenderSidebarLinks from "./RenderSidebarLinks";


type Props = {
    links: LinkType[];
    invertIcon?: boolean;
    navLinkProps?: NavLinkProps;
    containerProps?: ListProps;
    isIconOnlyProp?: string
};

const SidebarNavigation = ({
    links,
    navLinkProps,
    containerProps,
    invertIcon = false,
    isIconOnlyProp
}: Props) => {

    return (
        <ScrollArea
            h={"100%"}
            mah={"100%"}
        >
            <List {...containerProps}>
                <RenderSidebarLinks
                    items={links}
                    full={false}
                    invertIcon={invertIcon}
                    isIconOnlyProp={isIconOnlyProp}
                    navLinkProps={navLinkProps}
                />
            </List>
        </ScrollArea>
    )
};

export default SidebarNavigation;
