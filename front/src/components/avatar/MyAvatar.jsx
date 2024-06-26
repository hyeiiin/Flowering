import React from 'react'
import { Avatar, styled } from '@mui/material'

const MyAvatar = (
  { setSize, imgUrl }
) => {
  // const tmpImg = '/images/default/avatar20.png'
  const { name, role, id, nickname, imageUrl } = useSelector(state => state.auth.logonUser)

  return (
    <SetAvatar si={setSize}>
      <img src={imageUrl} alt='' />
    </SetAvatar>
  )
}

export default MyAvatar

const SetAvatar = styled(Avatar)((props) => ({
  backgroundColor: "#FFB471",
  width: `${props.si * 10}px`,
  height: `${props.si * 10}px`,
  img: {
    backgroundColor: 'white',
    borderRadius: "100%",
    width: `${props.si * 9}px`,
    height: `${props.si * 9}px`,
  }
}))