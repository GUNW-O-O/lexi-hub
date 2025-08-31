import React, { useState } from 'react'
import { LoginForm } from 'features/auth/login'
import { SignupForm } from 'features/auth/signup'
import { publicApi } from 'shared/api/api'

export const AuthPage: React.FC = () => {

  const [isNonMember, setIsNonMember] = useState<boolean>(false)

  const reqSingUp = () => {
    setIsNonMember(prev => !prev)
  }

  // const handleLogin = async (data:{ id: string, password: string }) => {
  //   try {
  //     const res = await publicApi.post('/auth/login', data);
  //     const { access_token } = res.data;
  //     localStorage.setItem('access_token', access_token);
  //     console.log(res.data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  const signup = async (data:{ id: string, password: string }) => {
    try {
      const res = await publicApi.post('/auth/join', data);
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    isNonMember ? 
    <SignupForm reqSingUp={reqSingUp} signup={signup} />
     : 
    <LoginForm reqSingUp={reqSingUp} />
  )
}
