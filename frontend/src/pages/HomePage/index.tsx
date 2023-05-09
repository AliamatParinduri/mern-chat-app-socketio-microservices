import { useEffect } from 'react'
import { Box, Container, TabList, Tabs, TabPanels, TabPanel, Tab, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { Login, SignUp } from '..'

const HomePage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')!)

    if (userInfo) navigate('/chats')
  }, [navigate])

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p="3"
        bg="white"
        w="100%"
        m="2.2rem 0 1rem 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl">My Chat App</Text>
      </Box>
      <Box p="4" bg="white" w="100%" borderRadius="lg" color="black" borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage
