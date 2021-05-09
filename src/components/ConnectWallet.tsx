import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";
import styled from "styled-components";

const Content = styled.div`
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const ConnectWallet = ({ onConnect }: { onConnect: () => void }) => {
  const [open, setOpen] = useState(true);

  const handleConnect = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setOpen(false);
      onConnect()
    } catch (e) {
      console.error("Error connecting wallet", e);
    }
  };

  const handleClose = () => {};

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Connect Metamask wallet to begin</DialogTitle>
      <Content>
        <Button variant="contained" color="primary" onClick={handleConnect}>
          Connect
        </Button>
      </Content>
    </Dialog>
  );
};

export default ConnectWallet;
