import styled from 'styled-components'
const CustomButton = styled.button(props => ({
  fontsize: '1em',
  height: '100%',
  padding: '1em 1.25em',
  borderRadius: '10px',
  color: `${props.color}`,
  border: `2px solid ${props.color}`,
  backgroundColor: 'white',
  boxSizing: 'border-box',
  whiteSpace:'normal'

}));

export default CustomButton;