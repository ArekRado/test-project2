import React from 'react'
import styled from 'styled-components'
import { useRequest } from '../hooks/useRequest'
import { TileCategory } from '../components/TileCategory'
import { Link } from 'react-router-dom'
import { GetCategoriesResponse } from '../types/api'

const CategoryLink = styled(props => <Link {...props} />)`
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

const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Categories = () => {
  const {
    response,
  } = useRequest<GetCategoriesResponse>('https://api.spotify.com/v1/browse/categories', {
    defaultResponse: { categories: { items: [] } },
  })

  return (
    <CategoriesWrapper>
      {response.categories.items.map(category => (
        <CategoryLink key={category.id} to={`/categories/${category.id}`}>
          <TileCategory
            title={category.name}
            thumbnails={category.icons}
          />
        </CategoryLink>
      ))}
    </CategoriesWrapper>
  )
}

export default Categories