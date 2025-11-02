import { Text } from "@mantine/core";

/* //TODO add real svg with full and small logo
  type Props = {}*/

const Logo = () => {
  return (
    <Text
      variant='gradient'
      gradient={{
        from: "var(--mantine-color-green-4)",
        to: "var(--mantine-primary-color-5)"
      }}
      fz="h5"
      component='h1'
      fw={900}
    >
      BIA601_HW_F24
    </Text>
  )
}

export default Logo