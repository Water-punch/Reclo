import useUserStore from "../stores/user"
import * as Api from '../api/api'
import { useNavigate } from "react-router-dom";

const setTokenInStorage = (token) => {
  localStorage.setItem('accessToken', token)
}

const removeTokenFromStorage = () => {
  localStorage.removeItem('accessToken')
}

export const useHandleLogin = async (event) => {
  event.preventDefault()
  const { user, setUser, login, setLogin } = useUserStore()
  const navigate = useNavigate()
  
  try {
    const res = await Api.post('user/login', data)

    await setLogin()
    await setUser(res.data.user)
    console.log(login) 
    console.log(user)
    console.log(`로그인 성공`)

    // 응답 헤더에서 쿠키를 추출
    const accessToken = res.headers['set-cookie'].find(cookie => cookie.startsWith('accessToken'))
    const refreshToken = res.headers['set-cookie'].find(cookie => cookie.startsWith('refreshToken'))

    // 토큰을 스토리지에 저장
    setTokenInStorage(accessToken)

    // 쿠키 저장
    document.cookie = accessToken
    document.cookie = refreshToken

    navigate('/', { replace: true })
  } catch (error) {
    alert('로그인에 실패했습니다.')
    console.error("로그인 실패:", error)
  }
}

export const useHandleLogout = async (event) => {
  event.preventDefault()
  const { user, resetUser, login, setLogout } = useUserStore()
  const navigate = useNavigate()

  console.log(`로그아웃 이전 login ${login}`)

  try {
    await Api.post('user/logout')
    await setLogout()
    await resetUser()

    console.log(user)

    removeTokenFromStorage()

    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

    console.log(`로그아웃 이후 login ${login}`)
    alert('로그아웃 완료')

  } catch (err) {
    console.log('로그아웃 실패 현재 login: ', login)
    navigate('/login')
  }
}