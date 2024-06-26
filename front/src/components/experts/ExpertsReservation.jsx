import { useState } from "react";
import { useSelector } from "react-redux"; // useSelector import 추가
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Title from "../modify/Title";
import MyCalendar from "../common/MyCalendar";
import ExpertsRadioButton from "./ExpertsRadioButton";
import { ButtonBox } from "../common/Button";
import { setSelectedDate, setSelectedTime } from "../../store/selectedSlice";

const MyButton = styled(ButtonBox)`
  border-radius: 300px;
  margin: 80px;
  width: 230.145px;
  height: 59.143px;
`;

const Cal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const M1 = styled.div`
  display: flex;
  padding-top: 10px;
  margin: 20px;
`;

const Margin = styled.div`
  margin: -50px;
`;
const Margin2 = styled.div`
  margin: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const ExpertsReservation = () => {
  const navigate = useNavigate();
  const [isReserved, setIsReserved] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const { selectedDate, selectedTime  } = useSelector(state => state.selected);
  const handleClick = () => {
    navigate('/orderpage');
  };

  // 배열을 4개씩 그룹화하는 함수
  const chunkArray = (array, chunk_size) => {
    var results = [];
    while (array.length) {
      results.push(array.splice(0, chunk_size));
    }
    return results;
  }

  // isReserved 배열에서 time 값이 '14:00:00'인 요소를 제거
  const filteredIsReserved = isReserved.filter(item => item.time !== '14:00:00');

  // filteredIsReserved 배열을 4개씩 그룹화
  const groupedIsReserved = chunkArray(filteredIsReserved, 4);

  return (
    <Cal>
      <Margin />
      <Title text={"Reservation"} />
      <Margin2 />
      <MyCalendar setIsReserved={setIsReserved}/>
      {groupedIsReserved.map((group, groupIndex) => (
        <M1 key={groupIndex}>
          {group.map((item, index) => (
            <ExpertsRadioButton
              key={index}
              value={item.time.slice(0, 5)} // value 값을 'xx:00' 형식으로 표시
              active={item.active}
              name={`myradio${groupIndex * 4 + index}`}
              selectedDate={selectedDate}
              margin-right="10px"
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          ))}
        </M1>
      ))}
      <ButtonContainer>
        <MyButton onClick={handleClick}>결제하기</MyButton>
      </ButtonContainer>
    </Cal>
  );
};

export default ExpertsReservation;