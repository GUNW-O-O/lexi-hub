import React, { useState } from 'react'
import { LoginForm } from 'features/auth/login'
import { SignupForm } from 'features/auth/signup'

export const AuthPage: React.FC = () => {

  const [isNonMember, setIsNonMember] = useState<boolean>(false)

  const reqSingUp = () => {
    setIsNonMember(prev => !prev)
  }

  return (
    isNonMember ? 
    <SignupForm reqSingUp={reqSingUp} />
     : 
    <LoginForm reqSingUp={reqSingUp} />
  )
}
