import React from 'react';
import { Tr, Td, Button } from '@chakra-ui/react';

function AccountRow({ account, index, deleteAccount, openKeywordModal, openPromptModal }) {
  return (
    <Tr>
      <Td>{account.name}</Td>
      <Td>{account.status}</Td>
      <Td>
        <Button colorScheme="teal" onClick={() => openKeywordModal(account)}>
          Update Keyword
        </Button>
      </Td>
      <Td>
        <Button colorScheme="purple" onClick={() => openPromptModal(account)}>
          Update Prompt
        </Button>
      </Td>
      <Td>
        <Button colorScheme="red" onClick={() => deleteAccount(index)}>
          Delete Account
        </Button>
      </Td>
    </Tr>
  );
}

export default AccountRow;
