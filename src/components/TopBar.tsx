import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const Input = styled.input`
  border-width: 0;
  height: 25px;
  padding: 0 10px;
  border-radius: 500px;
`
type TopBarProps = {
  onChange: (value: string) => void,
  searchText: string,
}
export const TopBar: React.FC<TopBarProps> = ({ onChange, searchText }) => {
  const history = useHistory()

  return (
    <Input
      type='text'
      value={searchText}
      onChange={e => onChange(e.target.value)}
      placeholder='Search'
      onClick={() => history.push('/')}
    />
  )
}
