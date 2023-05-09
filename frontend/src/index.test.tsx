import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import ChatProvider from './context/ChatProvider'

describe('App', () => {
  it('initial render', () => {
    render(
      <BrowserRouter>
        <ChatProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </ChatProvider>
      </BrowserRouter>
    )

    screen.debug()
  })
})
