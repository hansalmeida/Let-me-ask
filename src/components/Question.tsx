import { ReactNode } from "react"
import styled, { css } from "styled-components"

type Author = {
  avatar: string
  name: string
}

interface QuestionProps {
  data: {
    id: string
    content: string
    author: Author
    isAnswered: boolean
    isHighlighted: boolean
  }
  children: ReactNode
}

export const Question = ({
  data: { id, author, content, isAnswered = false, isHighlighted = false },
  children,
  ...props
}: QuestionProps) => {
  return id ? (
    <StyledQuestion
      {...props}
      isAnswered={isAnswered}
      isHighlighted={isHighlighted}
    >
      <Content>{content}</Content>

      <AuthorContainer>
        <Avatar src={author.avatar} alt={author.name} />
        <Name>{author.name}</Name>
      </AuthorContainer>

      <Actions>{children}</Actions>
    </StyledQuestion>
  ) : null
}

type StyledQuestionProps = {
  isAnswered: boolean
  isHighlighted: boolean
}
const StyledQuestion = styled.div<StyledQuestionProps>`
  ${({ theme, isAnswered, isHighlighted }) => css`
    display: grid;
    grid:
      "content content"
      "author  actions";
    justify-content: space-between;
    gap: 1.5rem 0;

    padding: 1.5rem;

    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
    border-radius: 0.5rem;
    background: ${theme.colors.whiteDetails};

    ${isHighlighted &&
    css`
      border: 1px solid ${theme.colors.purple};
      background: #f4f0ff;
    `}

    ${isAnswered &&
    css`
      border: 1px solid transparent;
      background: ${theme.colors.grayLight};
    `}
  `}
`

const Content = styled.p`
  grid-area: content;
`

const AuthorContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  gap: 0.5rem;
  align-items: center;
`

const Avatar = styled.img`
  width: 2rem;
  height: 2rem;

  border-radius: 50%;
`

const Name = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.grayDark};
    font-size: 0.875rem;
  `}
`

const Actions = styled.div`
  grid-area: actions;

  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  align-items: end;
  justify-content: end;
  gap: 1rem;
`
