import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";

import { Box, Grid } from '@mui/material'
import MessageIcon from '@mui/icons-material/Message';
import ChatList from './ChatList'
import { IoIosSend } from "react-icons/io";
import { RiSendPlaneLine } from "react-icons/ri";
import { VscFoldUp } from "react-icons/vsc";
import { appendMessageList, appendParticipantList } from '../../store/consultSlice';


const OneToOneChat = () => {
  const [msg, setMsg] = useState('');
  // const { role, imageUrl } = useSelector(state => state.auth.logonUser)
  // const { session, messageId } = useSelector(state => state.consult)
  const dispatch = useDispatch()

  const [isPersonalSelected, setIsPersonalSelected] = useState(true); // State to manage personal button selection
  const { session, messageId, participantList } = useSelector(state => state.consult)
  const { role, imageUrl, name, id, isMic, isCam } = useSelector(state => state.auth.logonUser)


  const handlePersonalClick = () => {
    setIsPersonalSelected(true); // Set personal button as selected
  }


  const handleGroupClick = () => {
    setIsPersonalSelected(false); // Set personal button as unselected

  }

  const handleMessage = () => {

    if (session && msg.length > 0) {


      const mine = {
        id: messageId,
        role: role,
        imageUrl: imageUrl,
        side: 'left',
        message: msg,
        name: name,
      }

      if (role == mine.role)
        dispatch(appendMessageList(mine))


      const data = {

        id: messageId,
        role: role,
        imageUrl: imageUrl,
        name: name,
        message: msg

      }

      const persondata = {
        imageUrl: imageUrl,
        name: name,
        isMic: isMic,
        isCam: isCam,
        role: role
      };

      session.signal({
        data: JSON.stringify(data),
        to: [],
        type: 'chat'
      })

      session.signal({
        persondata: JSON.stringify(persondata),
        to: [],
        type: 'participant'
      })

      setMsg('')
    }

  }

  useEffect(() => {
    if (session) {

      session.on('signal:participant', addparticiapnt)

    }
  }, [session])


  const textChat = (event) => {
    const data = JSON.parse(event.data)

    if (data.role !== role) {

      dispatch(appendMessageList(data));
    }

  }



  const addparticiapnt = (event) => {
    const data = JSON.parse(event.data)

    if (data.role !== role) {
    }
  }

  const Foldpos = styled.div`
  && {
     position: absolute;
     right: 10%;
     top: 33%;
     color: #df5050;
  }
  `;

  return (
    <ChatGrid item xs={12} >
      <Header>
        <TitleText>
          채팅
        </TitleText>

        <Foldpos>

          {/* <VscFoldUp /> */}

        </Foldpos>

      </Header>


      <ChatContainer>
        <ChatList />

        {/* <Bottomcontent> */}



        {/* </Bottomcontent> */}


      </ChatContainer>

 



    </ChatGrid>
  )
}

export default OneToOneChat;


const Group = styled.div`
  && {
    position: absolute;
    right: 55%;
    top: 32%;
    background-color: ${props => props.selected ? '#F28482' : '#f3d1d1'}; // 조건에 따라 배경색 변경
    border-radius: 71px;
    color: ${props => props.selected ? '#f5f5f5' : '#e40505'}; // 조건에 따라 텍스트 색상 변경
    width: 19%;
    height: 5%;
    align-items: center;
    padding-left: 15px; /* Adjust the padding-right value as needed */
    

  }
`;

const Person = styled.div`
  && {
    position: absolute;
    right: 22%;
    top: 32%;
    background-color: ${props => props.selected ? '#F28482' : '#f3d1d1'}; // 조건에 따라 배경색 변경
    border-radius: 71px;
    color: ${props => props.selected ? '#f5f5f5' : '#e40505'}; // 조건에 따라 텍스트 색상 변경
    width: 48%;
    height: 5%;
    align-items: center;
    justify-content: flex-end; /* 텍스트를 오른쪽으로 정렬 */
    display: flex;
     padding-right: 28px ; /* 텍스트 주변에 여백 추가 */

   }
`;
const PlanePos = styled.div`
  && {
    position: absolute;
    right: 25%;
    top: 15%;
  }
`;

const Header = styled.div`
  && {
   display: flex;
   flex-direction: row;
  /* border: 1px solid black; */
   height: 13%;
  }
`;

const IconButton = styled.div`
  && {
    /* font-size: 2rem; */
    height: 30px;
    width: 30px;
    /* padding: 0.2rem 1rem; */
    /* width: calc(100% - 100px); */
    /* border: 11px solid; */
    border-radius: 50%;
    background-color: #f28482;
    font-weight: bold; /* 글자를 진하게 설정 */
    align-items: center;
    position: absolute;
    right: 32%;
  }
`;
const TitleText = styled.div`
  && {
    font-size: 1rem;
    padding: 0.9rem 1rem;
    width: 100%;
    /* border: 11px solid; */
    background-color: #ffffff;
     font-weight: bold; /* 글자를 진하게 설정 */
     height: 55%;
     align-items: center;
  }
`;


const ChatGrid = styled(Grid)`
  && {
    width: 100%;
    height: 66.5%;  
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    border-radius: 4px;
    background-color: #F5F5F5;
    /* border: 2px solid black; */
     /* padding: 10px; */
  }
`;

const ChatContainer = styled(Grid)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
     overflow: hidden;
     margin-left: 7%;
  }
`;
const IContainer = styled(Box)`
  && {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;  
    background-color:  #ffffff;
     /* width: ; */
     /* border: 1px solid black; */
    height: 17%;
    margin-top: 13%;
    top:120%
   }
`;

const Input = styled.input`
  && {
    font-size: 1rem;
    padding: 0.2rem 1rem;
    width:  49%;
      background-color:  #efeaea;
    margin-left: 5%;
    border-radius: 19px;
    height: 42%;
  }
`;
