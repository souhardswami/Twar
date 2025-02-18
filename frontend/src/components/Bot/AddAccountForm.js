import React, { useState } from "react";
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
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const AddAccountForm = ({ isOpen, onClose, addAccount }) => {
  const [accountData, setAccountData] = useState({
    bearer_token: "",
    consumer_key: "",
    consumer_secret: "",
    access_token: "",
    access_token_secret: "",
    name: "",
    twitter_account: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData({ ...accountData, [name]: value });
  };

  const handleSubmit = () => {
    addAccount(accountData);
    setAccountData({
      bearer_token: "",
      consumer_key: "",
      consumer_secret: "",
      access_token: "",
      access_token_secret: "",
      name: "",
      twitter_account: "",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              placeholder="Name"
              value={accountData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>twitter Account</FormLabel>
            <Input
              name="twitter_account"
              placeholder="Twitter Account"
              value={accountData.twitter_account}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Bearer Token</FormLabel>
            <Input
              name="bearer_token"
              placeholder="Bearer Token"
              value={accountData.bearer_token}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Consumer Key</FormLabel>
            <Input
              name="consumer_key"
              placeholder="Consumer Key"
              value={accountData.consumer_key}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Consumer Secret</FormLabel>
            <Input
              name="consumer_secret"
              placeholder="Consumer Secret"
              value={accountData.consumer_secret}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Access Token</FormLabel>
            <Input
              name="access_token"
              placeholder="Access Token"
              value={accountData.access_token}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Access Token Secret</FormLabel>
            <Input
              name="access_token_secret"
              placeholder="Access Token Secret"
              value={accountData.access_token_secret}
              onChange={handleChange}
            />
          </FormControl>
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

export default AddAccountForm;
