/* eslint-disable n/handle-callback-err */
import { useState } from 'react'

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast
} from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BaseURL, Cloudinary } from '../../config'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pic, setPic] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const handleClick = () => setShow((prev) => !prev)

  const postDetails = async (pics: any) => {
    setLoading(true)

    if (pic === undefined) {
      return toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset', 'chat-app')
      data.append('cloud_name', 'deomgdtou')

      fetch(Cloudinary, {
        method: 'post',
        body: data
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString())
          setLoading(false)
        })
        .catch((err) => {
          toast({
            title: 'Failed upload image!',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right'
          })
          return setLoading(false)
        })
    } else {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      return setLoading(false)
    }
  }

  const submitHandler = async () => {
    setLoading(true)
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: 'Please fill all the fields!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      setLoading(false)
      return false
    }
    if (password !== confirmPassword) {
      toast({
        title: 'Password do not match!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      setLoading(false)
      return false
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      }

      const { data } = await axios.post(`${BaseURL}/v1/auth/register`, { name, email, password, pic }, config)
      toast({
        title: 'Registration Successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })

      setLoading(false)
      navigate('/')
    } catch (err: any) {
      setLoading(false)
      toast({
        title: 'Error Occured!',
        description: err.response.data.description,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="full-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input type="text" placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="text" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Your Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p="1.5"
          accept="image/*"
          onChange={(e) => {
            e.target.files ? postDetails(e.target.files[0]) : null
          }}
        />{' '}
      </FormControl>

      <Button colorScheme="blue" w="100%" style={{ marginTop: '1rem' }} onClick={submitHandler} isLoading={loading}>
        Sign Up
      </Button>
    </VStack>
  )
}

export default SignUp
