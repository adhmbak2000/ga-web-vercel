import { Container, Stack } from "@mantine/core"
import GeneticsAlgo from "./components/GeneticsAlgo"
import HomeHeader from "./components/HomeHeader"


const Home = () => {

  return (
    <Container fluid >
      <Stack p={25} gap={20}>
        <HomeHeader />
        <GeneticsAlgo />
      </Stack>
    </Container >
  )
}

export default Home