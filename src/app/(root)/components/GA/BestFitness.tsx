import { Card } from "@mantine/core";
import { FaDna } from "react-icons/fa6";
import InfoBadge from "../../../../../lib/components/view/InfoBadge";

type Props = {
  bestFitness: number
}

const BestFitness = ({ bestFitness }: Props) => {
  return (
    <Card
    mx={25}
    py={25}
    px={10}
    shadow="xl"
    radius="lg"
    >
      <InfoBadge
        icon={<FaDna />}
        label="The Best Fitness"
        color="indigo"
        variant="light"
        labelProps={{
          fz: "h2",
          fw: 700,
          variant: "gradient",
          gradient: {
            from: "var(--mantine-color-indigo-5)",
            to: "var(--mantine-color-green-5)",
            deg: 360
          }
        }}
        badgeProps={{
          fz: "xl",
          fw: 700,
        }}
      >
        {bestFitness.toFixed(4)}
      </InfoBadge>
    </Card>
  )
}

export default BestFitness