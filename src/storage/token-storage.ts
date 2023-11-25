import { TOKEN } from '@/variables-environment'
import { setCookie, parseCookies } from 'nookies' 

export function setTokenStorage(token: string) {
  setCookie(null, TOKEN, token)
}

export function verifyTokenStorage() {
  const cookies = parseCookies()

  return {
    token: cookies[TOKEN],
    exists: !!cookies[TOKEN]
  }  
}