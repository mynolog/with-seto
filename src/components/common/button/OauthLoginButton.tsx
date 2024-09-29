import type { OauthProvider } from '../../../types/OauthTypes.ts'
import CommonButton, { CommonButtonProps } from './CommonButton.tsx'
import { RiKakaoTalkFill } from 'react-icons/ri'
import { FaGoogle } from 'react-icons/fa'

type OauthLoginButtonProps = {
  provider: OauthProvider
} & CommonButtonProps

const providerIcons = {
  Google: <FaGoogle className="text-xl inline-block mr-2" />,
  Kakao: <RiKakaoTalkFill className="text-2xl inline-block mr-2" />,
}

export default function OauthLoginButton({
  provider,
  textColor = 'white',
  bgColor = '#AABFB2',
  fontSize = '1rem',
  onClick = () => {},
}: OauthLoginButtonProps) {
  const icon = providerIcons[provider] || null
  return (
    <CommonButton
      textColor={textColor}
      bgColor={bgColor}
      fontSize={fontSize}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span>{provider} 로그인</span>
    </CommonButton>
  )
}
