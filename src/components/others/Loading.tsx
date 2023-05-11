import styled from 'styled-components'

const LoadingStyled = styled.div`
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid #ccc;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

function Loading() {
  return (
    <LoadingStyled>
      <span className="loader"></span>
    </LoadingStyled>
  )
}

export default Loading
