import React from 'react'
import styled from 'styled-components'
import { AlignItemsProperty, JustifyContentProperty, FlexDirectionProperty, FlexWrapProperty, FlexProperty } from 'csstype'

type Wrapper = {
  alignItems?: AlignItemsProperty,
  justifyContent?: JustifyContentProperty,
  flexDirection?: FlexDirectionProperty,
  flexWrap?: FlexWrapProperty,
  flex?: FlexProperty<string>,
}
const Wrapper = styled.div<Wrapper>`
  display: flex;
  align-items: ${params => params.alignItems};
  justify-content: ${params => params.justifyContent};
  flex-direction: ${params => params.flexDirection};
  flex-wrap: ${params => params.flexWrap};
  flex: ${params => params.flex};
`

export const Flex: React.FC<Wrapper> = ({
  alignItems,
  justifyContent,
  flexDirection,
  flexWrap,
  flex,
  children,
}) => (
    <Wrapper
      alignItems={alignItems}
      justifyContent={justifyContent}
      flexDirection={flexDirection}
      flexWrap={flexWrap}
      flex={flex}
    >
      {children}
    </Wrapper>
  )
