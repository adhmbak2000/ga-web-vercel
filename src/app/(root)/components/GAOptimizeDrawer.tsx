"use client"

import { GAData } from "@/app/server/api/generate/route";
import InfoDrawer from "../../../../lib/components/layout/drawers/InfoDrawer";
import { UseBooleanReturn } from "../../../../lib/hooks/useBoolean";
import GAOptimizeContent from "./GA/GAOptimizeContent";

type Props = {
    open: UseBooleanReturn
    data: GAData[]
}

const GAOptimizeDrawer = ({ open, data }: Props) => {


    return (
        <InfoDrawer
            open={open}
            size="85vh"
            maxWidth={"80vw"}
            onClose={open.onFalse}
        >
            {
                open.value &&
                <GAOptimizeContent
                    data={data}
                />
            }
        </InfoDrawer>
    )
}

export default GAOptimizeDrawer