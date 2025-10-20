import React from "react";
import { Table, Button, Icon } from "@chakra-ui/react";

const Status = (props) => (
  <>
    {props.status == "1" ? (
      <>
        <Icon viewBox="0 0 200 200" color="green.600">
          <path
            fill="currentColor"
            d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
          />{" "}
        </Icon>
        Working...
      </>
    ) : (
      <> Stopped &#10071;</>
    )}
  </>
);

const AccountTable = ({
  accounts,
  deleteAccount,
  switchStatus,
  handleKPIPage,
}) => {
  return (
    <Table.Root size="sm" showColumnBorder>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Bot</Table.ColumnHeader>
          <Table.ColumnHeader>Status</Table.ColumnHeader>
          <Table.ColumnHeader>Daily KPI</Table.ColumnHeader>
          <Table.ColumnHeader>Weekly KPI</Table.ColumnHeader>
          <Table.ColumnHeader>More Actions</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {accounts.map((account, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <a href={`https://x.com/${account.screen_name}`} target="_blank">
                <span colorPalette="red">{account.screen_name}</span>
              </a>
            </Table.Cell>
            <Table.Cell>
              <Status
                boxSize={5}
                color={account.status ? "green.100" : "red.100"}
                status={account.status}
              />
            </Table.Cell>
            <Table.Cell>
              {account.used_daily}/{account.daily}
            </Table.Cell>
            <Table.Cell>
              {account.used_weekly}/{account.weekly}
            </Table.Cell>
            <Table.Cell>
              <Button
                colorPalette={account.status  ? "pink" : "green"}
                size="xs"
                onClick={() => switchStatus(account.id)}
              >
                {!account.status ? "Active" : "InActive"}
              </Button>
              <Button
                size="xs"
                colorPalette="blue"
                ml={2}
                onClick={() => handleKPIPage(account)}
              >
                Update KPI
              </Button>
              <Button
                size="xs"
                colorPalette="red"
                ml={2}
                onClick={() => deleteAccount(account.id)}
              >
                Delete Bot
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default AccountTable;
