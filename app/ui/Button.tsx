import { Button as MuiButton } from '@mui/material'
import { styled } from '@mui/system'

const Button = styled(MuiButton)(({ }) => ({
  padding: '5px 32px', 
  backgroundColor: 'hotpink', 
  fontSize: '10px', 
  fontWeight: 'bold', 
  borderRadius: '4px', 
  color: 'black', 
  '&:hover': {
    backgroundColor: 'darkviolet', 
    color: 'white',
  },
  transition: 'background-color 0.3s ease', 
}))

export default Button
