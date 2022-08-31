import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Spacer,
  Text
} from '@chakra-ui/react'
import { useState } from 'react'
import { Navbar } from '@/shared/components'
import { detailContacts } from '@/shared/services'
import {
  useQuery,
} from 'react-query'
import { IContact } from '@/entities'
import { useParams } from 'react-router-dom'
import { Blue_Contact, Gray_Ballon, Green_Ballon, Hot_Air_Ballon, Purple_Ballon } from '@/assets'

export const Page_DetailView = () => {

  const [contact, setContact] = useState<IContact>()

  let { name } = useParams();

  const { isLoading, isError, isSuccess } = useQuery(
    ['contacts', { name }],
    () => detailContacts(name as string),
    {
      onSuccess: (data) => {
        console.log(data)
        setContact(data)
      },
    }
  )

  return (
    <>
      <Navbar />
      <Flex
        className={'App'}
        fontFamily={'fonts.body'}
        fontWeight={'extrabold'}
        bgColor={'background'}
        direction={'column'}
        gap={'10'}
        p={'16'}
      >
        {
          contact && (
            <>
              <Flex direction={'row'} alignItems={'center'}>
                <Flex
                  direction={'row'}
                  alignItems={'center'}
                >
                  <Image
                    src={Gray_Ballon}
                    alt="TakeBlip Logo"
                    boxSize={'60px'}
                    m={3}
                  />
                  <Flex direction={'column'}>
                    <Text fontSize={'2xl'} fontWeight={'extrabold'}>
                      {contact?.name}
                    </Text>
                    <Text fontSize={'lg'} fontWeight={'extrabold'}>
                      {contact?.type}
                    </Text>
                  </Flex>
                </Flex>

                <Text ml={'auto'} fontSize={'lg'} fontWeight={'normal'} color={'detailText'}>
                  {"Created at " + new Intl.DateTimeFormat('pt-BR')
                    .format(new Date(contact.created))}
                </Text>
              </Flex>

              <Box height={'2px'} width={'100%'} bgColor={'iconLight'} />

              <Grid
                templateColumns={'repeat(10, 1fr)'}
                templateRows={'1fr'}
                gap={'10'}
              >
                <GridItem
                  colSpan={7}
                >
                  <Grid
                    templateRows={'repeat(2, 1fr)'}
                    templateColumns={'repeat(5, 1fr)'}
                    gap={'10'}
                  >
                    <GridItem
                      colSpan={2}
                      bgColor={'white'}
                      borderRadius={'lg'}
                      p={'8'}
                    >
                      <Flex direction={'column'}
                        gap={'4'}
                      >
                        <Box>
                          <Text fontSize={'lg'} fontWeight={'normal'}>
                            Region and idiom
                          </Text>
                          <Text fontSize={'lg'} fontWeight={'normal'}>
                            {contact.culture}
                          </Text>
                        </Box>
                        <Box>
                          <Text fontSize={'lg'} fontWeight={'normal'}>
                            Timezone
                          </Text>
                          <Text fontSize={'lg'} fontWeight={'normal'}>
                            {new Date().toUTCString()}
                          </Text>
                        </Box>
                      </Flex>
                    </GridItem>


                    <GridItem
                      colSpan={3}
                      borderRadius={'lg'}
                      bgColor={'white'}
                      p={'8'}
                    >

                      <Flex
                        direction={'row'}
                        alignItems={'center'}
                        width={'100%'}
                        height={'100%'}
                      >
                        <Image
                          src={Blue_Contact}
                          alt="TakeBlip Logo"
                          boxSize={'60px'}
                          m={3}
                        />
                        <Flex direction={'column'}>
                          <Text fontSize={'2xl'} fontWeight={'extrabold'}>
                            {contact?.analytics?.user.actived}
                          </Text>
                          <Text fontSize={'lg'} fontWeight={'normal'}>
                            Usuários ativos
                          </Text>
                        </Flex>
                      </Flex>
                    </GridItem>

                    <GridItem
                      colSpan={3}
                      borderRadius={'lg'}
                      bgColor={'white'}
                      p={'8'}
                    >

                      <Flex
                        direction={'row'}
                        alignItems={'center'}
                        width={'100%'}
                        height={'100%'}
                      >
                        <Image
                          src={Green_Ballon}
                          alt="TakeBlip Logo"
                          boxSize={'60px'}
                          m={3}
                        />
                        <Flex direction={'column'}>
                          <Text fontSize={'2xl'} fontWeight={'extrabold'}>
                            {contact?.analytics?.message.received}
                          </Text>
                          <Text fontSize={'lg'} fontWeight={'normal'}>
                            Mensagens recebidas
                          </Text>
                        </Flex>
                      </Flex>
                    </GridItem>

                    <GridItem
                      colSpan={2}
                      borderRadius={'lg'}
                      bgColor={'white'}
                      p={'8'}
                    >

                      <Flex
                        direction={'row'}
                        alignItems={'center'}
                        width={'100%'}
                        height={'100%'}
                      >
                        <Image
                          src={Purple_Ballon}
                          alt="TakeBlip Logo"
                          boxSize={'60px'}
                          m={3}
                        />
                        <Flex direction={'column'}>
                          <Text fontSize={'2xl'} fontWeight={'extrabold'}>
                            {contact?.analytics?.message.sent}
                          </Text>
                          <Text fontSize={'lg'} fontWeight={'normal'}>
                            Mensagens enviadas
                          </Text>
                        </Flex>
                      </Flex>
                    </GridItem>


                  </Grid>
                </GridItem>

                <GridItem
                  colSpan={3}
                  rowSpan={1}
                >
                  <Flex direction={'column'} height={'100%'} justifyContent={'space-around'}
                  >
                    < Image
                      src={Hot_Air_Ballon}
                      alt="TakeBlip Logo"
                      boxSize={'70%'}
                      maxHeight={'50%'}
                      m={'0 auto'}

                    />

                    <Text
                      fontSize={'lg'}
                      fontWeight={'normal'}
                      m={'0 auto'}
                    >
                      Status account
                    </Text>

                    <Text
                      fontSize={'lg'}
                      fontWeight={'extrabold'}
                      m={'0 auto'}
                    >
                      Free
                    </Text>

                    <Button
                      bgColor='highlight'
                      color={'white'}
                    >Update account</Button>
                  </Flex>
                </GridItem>

              </Grid>
            </>
          )
        }

        <Box height={'2px'} width={'100%'} bgColor={'iconLight'} />

        <Text m={'auto'}  >
          ©2019, BLiP Todos os direitos reservados | Termos de Uso
        </Text>
      </Flex >


    </>
  )
}