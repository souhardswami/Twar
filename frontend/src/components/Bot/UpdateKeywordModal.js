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

const UpdateKeywordModal = ({
  isOpen,
  onClose,
  updateKeyword,
  selectedAccount,
}) => {
  const [newKeyword, setNewKeyword] = useState("");

  useEffect(() => {
    if (selectedAccount) {
      setNewKeyword(selectedAccount.keywords);
    }
  }, [selectedAccount]);

  const handleSubmit = () => {
    updateKeyword(selectedAccount.id, newKeyword);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Keyword</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Enter new keyword"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
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

export default UpdateKeywordModal;
