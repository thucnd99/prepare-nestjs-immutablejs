import { Button } from "antd"
import styled from 'styled-components'
const CustomButton = styled(Button)(props => ({
  fontsize: '1em',
  padding: '0.25em 1em',
  borderRadius: '10px',
  color: `${props.color}`,
  border: `2px solid ${props.color}`,
}));

export default CustomButton;