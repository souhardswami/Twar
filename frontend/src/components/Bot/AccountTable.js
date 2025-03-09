import React, { useState } from "react";
import UpdateKpiModal from "./UpdateKpiModal";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Icon } from "@chakra-ui/react";


const Status = (props) => (
  <>
    { props.status == '1' ? 
      <>
        <Icon viewBox='0 0 200 200' color='green.600'>
        <path
          fill='currentColor'
          d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
        /> </Icon>
        Working... 
      </>: 
      <> Stopped &#10071; 
      </>
    }
  </>
)


const AccountTable = ({
  accounts,
  deleteAccount,
  deactivateAccount,
  handleKPIPage
}) => {

  const [isKPIModelOpen, setIsKPIModelOpen] = useState(false);

  const handleToggle = () => {
      setIsKPIModelOpen(!isKPIModelOpen);
  }

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Bot</Th>
          <Th>Status</Th>
          <Th>Daily KPI</Th>
          <Th>Weekly KPI</Th>
          <Th>More Actions</Th>
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
            <Td>
              <Status boxSize={5} color={account.status == "1" ? "green.500" : "red.600"} status={account.status} />
            </Td>
            <Td>
              {account.used_daily}/{account.daily}
            </Td>
            <Td>
              {account.used_weekly}/{account.weekly}
            </Td>
            <Td>
            
            <Button
                colorScheme={account.status == "1" ? "pink" : "green"}
                size="sm"
                onClick={() => deactivateAccount(account.id)}>
                {account.status == "0" ? "Activate" : "Deactivate"}
            </Button>
            <Button
                size="sm"
                colorScheme="blue"
                ml={2}
                onClick={() => handleKPIPage(account) }
              >
                Update KPI
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                ml={2}
                onClick={() => deleteAccount(account.id)}
              >
                Delete Bot
              </Button>


            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default AccountTable;
