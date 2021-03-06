import { darken } from "polished"
import { HTMLAttributes, useContext } from "react"
import { useHistory } from "react-router-dom"
import styled, { css } from "styled-components/macro"
import { ReactComponent as CopySvg } from "../assets/images/copy.svg"
import logoSvg from "../assets/images/logo.svg"
import { AuthContext } from "../contexts/AuthContext"
import { useRoom } from "../hooks/useRoom"
import { database } from "../services/firebase"
import { Button } from "./Button"

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  roomCode: string
}

export const Header = ({ roomCode, ...props }: HeaderProps) => {
  const { user } = useContext(AuthContext)
  const { authorId } = useRoom(roomCode)
  const history = useHistory()

  const copyRoomToClipboard = () => navigator.clipboard.writeText(roomCode)

  const handleEndRoom = async () => {
    await database.ref(`rooms/${roomCode}`).update({
      endedAt: new Date(),
    })

    history.push("/")
  }

  return (
    <StyledHeader {...props}>
      <img src={logoSvg} alt="Let me ask" style={{ height: 45 }} />

      <ButtonsContainer>
        <CopyPageIdButton onClick={copyRoomToClipboard}>
          <div className="icon-wrapper">
            <CopyIcon />
          </div>
          <span>Sala #{roomCode}</span>
        </CopyPageIdButton>

        {user?.id === authorId && (
          <CloseRoomButton onClick={handleEndRoom}>
            Encerrar sala
          </CloseRoomButton>
        )}
      </ButtonsContainer>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #e2e2e2;

  padding: 1.5rem 10.25rem;
`

const ButtonsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 0.5rem;
`

const CloseRoomButton = styled(Button)`
  ${({ theme }) => css`
    padding: 0.75rem 1.5rem;

    border: 1px solid ${theme.colors.purple};
    border-radius: 0.5rem;
    background: transparent;

    color: ${theme.colors.purple};
    font-size: 0.875rem;

    &:hover:enabled {
      background-color: ${theme.colors.purple};

      color: ${darken(0.05, theme.colors.whiteDetails)};
    }
  `}
`

const CopyPageIdButton = styled(CloseRoomButton)`
  ${({ theme }) => css`
    gap: 0;

    overflow: hidden;

    padding: 0;

    .icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 100%;
      padding: 0.625rem 0.75rem;

      background: ${theme.colors.purple};
      border-right: 1px solid transparent;
    }

    span {
      padding: 0.75rem 1.5rem;

      color: ${theme.colors.black};
    }

    &:hover {
      .icon-wrapper {
        border-right: 1px solid ${darken(0.1, theme.colors.purple)};
      }
      span {
        color: ${theme.colors.whiteDetails};
      }
    }
  `}
`

const CopyIcon = styled(CopySvg)`
  width: 20px;
  height: 20px;
`
