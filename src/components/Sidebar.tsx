import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`

const SidebarLink = styled(props => <Link {...props} />)`
  color: #fff;
  text-decoration: none;
  margin-top: 20px;
  display: flex;
  align-items: center;
`

const Avatar = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  margin-right: 10px;
`
type SidebarProps = {
  userName: string,
  userAvatar: string,
}
export const Sidebar: React.FC<SidebarProps> = ({ userName, userAvatar }) => {
  return (
    <SidebarWrapper>
      <SidebarLink to='/'>
        <Avatar src={userAvatar} alt='avatar' /> {userName}
      </SidebarLink>
      <SidebarLink to='/categories'>Categories</SidebarLink>
      <SidebarLink to='/new-relases'>New Relases</SidebarLink>
    </SidebarWrapper>
  )
}
