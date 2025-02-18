import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";

const UpdatePromptModal = ({
  isOpen,
  onClose,
  updatePrompt,
  selectedAccount,
}) => {
  const [newPrompt, setNewPrompt] = useState("");

  useEffect(() => {
    if (selectedAccount) {
      setNewPrompt(selectedAccount.prompt);
    }
  }, [selectedAccount]);

  const handleSubmit = () => {
    updatePrompt(selectedAccount.id, newPrompt);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Prompt</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Enter new prompt"
            value={newPrompt}
            onChange={(e) => setNewPrompt(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdatePromptModal;
