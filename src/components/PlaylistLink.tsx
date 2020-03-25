import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const PlaylistLink = styled(props => <Link {...props} />)`
  color: #fff;
  text-decoration: none;
  position: relative;
  width: 30%;
  max-width: 400px;
  margin: 5px;
  background: none;
  border-width: 0;
  padding: 0;
  display: flex;

  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`
