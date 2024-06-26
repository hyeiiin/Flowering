import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import { ButtonBox } from "../common/Button";
import styled from "styled-components";
import Alert from "@mui/material/Alert";
import { useState } from "react";

const Text = styled.p`
  font-family: "Noto Sans KR";
  font-size: 20px;
  font-weight: 500;
`;
const Warning = styled.div`
  text-align: start;
`;
const WithdrawalButton = styled(ButtonBox)`
  border-radius: 100px;
  width: 220px;
  margin-top: 1.5%;
`;
const LeaveButtom = styled(WithdrawalButton)`
  margin-top: 5%;
  width: 50%;
`;

const MySheet = styled(Sheet)`
  text-align: center;
`;
function WithdrawalCompleted(){

}
export default function Withdrawal() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmOpen = () => {
    setOpen(false); 
    setConfirmOpen(true); 
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false); 
  };

  return (
    <>
      <WithdrawalButton
        color="white"
        onClick={() => setOpen(true)}
      >
        탈퇴하기
      </WithdrawalButton>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <MySheet
          sx={{
            maxWidth: 400,
            borderRadius: "md",
            p: 2,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Text>회원 탈퇴</Text>
          <Warning>
            <Alert severity="error">
              회원 탈퇴 시 계정 정보 및 컨설팅 내역은 삭제되어 복구가 불가해요.
              정말로 탈퇴하시겠어요?
            </Alert>
          </Warning>
          <LeaveButtom onClick={handleConfirmOpen}>떠날래요</LeaveButtom>
        </MySheet>
      </Modal>
      <Modal
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-desc"
        open={confirmOpen}
        onClose={handleConfirmClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <MySheet

          sx={{
            width:300,
            borderRadius: "md",
            p: 2,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Text>회원 탈퇴</Text>
          <Warning>
            <Alert severity="success">
              회원 탈퇴가 완료되었습니다.
            </Alert>
          </Warning>
          <LeaveButtom onClick={handleConfirmClose}>확인</LeaveButtom>
        </MySheet>
      </Modal>
    </>
  );
}