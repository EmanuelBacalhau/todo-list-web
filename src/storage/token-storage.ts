import { TOKEN } from '@/variables-environment'
import { setCookie } from 'nookies' 

export function setTokenStorage(token: string) {
  setCookie(null, TOKEN, token)
}