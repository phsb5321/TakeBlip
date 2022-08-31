import { Flex, Image, } from '@chakra-ui/react'
import { TakeBlip } from '@/assets'

export const Navbar = () => (
  <header>
    <Flex bgColor={'navbar'} justifyContent={'center'} height={'60px'}>
      <Image src={TakeBlip} alt="TakeBlip Logo" boxSize={'60px'} />
    </Flex>
  </header>
)