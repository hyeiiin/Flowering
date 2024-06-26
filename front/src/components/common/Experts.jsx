import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import { ButtonBox } from "./Button";
import { Link } from "react-router-dom";
// import { setSeletedId } from "../../store/ExpertsListSlice";

import { useDispatch, useSelector } from 'react-redux';
import { setSelectedId } from "../../store/authSlice";

const Container = styled.div`
  position: relative;
  width: 317px;
  height: 418px;
  margin-right: 600px;
  margin-bottom: 50px;
`;

const Image = styled.img`
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: 0;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const StyledDiv = styled.div`
  width: 195px;
  height: 307px;
  background: #f6f6f6;
  border-top-right-radius: 100px;
  border-top-left-radius: 100px;
  position: absolute;
  top: 120px;
  left: 120px;
  z-index: 0;
`;

const BIBIText = styled.div`
  text-align: center;
  justify-content:start;
  color: black;
  font-size: 30px;
  font-family: "Lexend Deca";
  font-weight: 400;
  line-height: 30px;
  word-wrap: break-word;
  position: absolute;
  top: 150px;
  display:flex;
  left: 450px;
  width:500px;
`;

const OneText = styled.div`
  color: #6d6d6d;
  font-size: 20px;
  font-family: "Noto Sans KR";
  font-weight: 400;
  position: absolute;
  top: 200px;
  left: 450px;
  width: 260px;
`;

const StyledRating = styled(Rating)`
  & .MuiRating-iconFilled {
    color: #f28482;
  }
`;

export const StyledSmallDiv = styled.div`
  width: 80px;
  height: 33px;
  left: 450px;
  top: 300px;
  position: absolute;
  background: #f5f5f5;
  border-radius: 30px;
  text-align: center;
  font-size: 12px;
  font-family: "Noto Sans KR";
  align-items: center;
  justify-content: center;
  display: flex;
`;

const StyledSmallDiv2 = styled(StyledSmallDiv)`
  left: 540px;
  top: 300px;
`;

const MyButton = styled(ButtonBox)`
  position: absolute;
  width: 154px;
  border-radius: 30px;
  left: 750px;
  top: 350px;
`;

// 컴포넌트 정의
const Experts = ({
  id,
  nickname,
  text,
  rate,
  ratenum,
  tag1,
  tag2,
  imgsrc,
  width,
  height,
  path, 
}) => {
  const dispatch = useDispatch();

  const btnclick = (id) => {
    // 예약하기 버튼 클릭 시 동작할 함수 정의
    if (id == undefined) {

    }
    else
      dispatch(setSelectedId(id))
  };

  return (
    <Container>
      <Image src={imgsrc} width={width} height={height} />
      {/* <StyledDiv /> */}
      <BIBIText>{nickname}</BIBIText>
      <OneText>
        {text}
        <Stack spacing={1} direction="row" alignItems="center">
          <StyledRating
            name="half-rating-read"
            // defaultValue={rate}
            value={parseFloat(rate)}

            precision={0.5}
            readOnly
          />
          <span>({ratenum})</span>
        </Stack>
      </OneText>
      <StyledSmallDiv>{tag1}</StyledSmallDiv>
      <StyledSmallDiv2>{tag2}</StyledSmallDiv2>

      {/* <Link to={path} reloadDocument>
        <MyButton >예약하기</MyButton>
      </Link> */}

      <Link to={{
        pathname: path,
      }}>
        <MyButton onClick={() => btnclick(id)}>예약하기</MyButton>
      </Link>

    </Container>
  );
};

export default Experts;
