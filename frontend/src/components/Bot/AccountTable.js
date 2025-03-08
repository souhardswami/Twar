import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Icon } from "@chakra-ui/react";


const Status = (props) => (
  <>
    { props.status == 'active' ? 
      <>
        <Icon viewBox='0 0 200 200' color='green.600'>
        <path
          fill='currentColor'
          d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
        /> </Icon>
        'Working...'  
      </>: 
      <> Stopped &#10071; 
      </>
    }
  </>
)


const AccountTable = ({
  accounts,
  deleteAccount,
  openKeywordModal,
  openPromptModal,
  deactivateAccount,
  openKpiModal,
}) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Status</Th>
          <Th></Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {accounts.map((account, index) => (
          <Tr key={index}>
            <Td>
              <a href={`https://x.com/${account.screen_name}`} target="_blank">
                <span colorScheme="blue">{account.screen_name}</span>
              </a>
            </Td>
            <Td>{account.status}</Td>
            <Td>
              <Button
                colorScheme={account.status == "active" ? "pink" : "green"}
                size="sm"
                onClick={() => deactivateAccount(account.id)}
              ></Button>
            </Td>
            <Td>
              
              

              <Button
                size="sm"
                colorScheme="blue"
                ml={2}
                onClick={() => openKpiModal(account)}
              >
                View KPI
              </Button>

              <Button
                size="sm"
                colorScheme="red"
                ml={2}
                onClick={() => deleteAccount(account.id)}
              >
                Delete
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default AccountTable;
