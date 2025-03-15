import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Heading,
  Center,
  Input,
  Button,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import AccountTable from "./AccountTable";
import UpdateKpiModal from "./UpdateKpiModal";

const WorkspacePage = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [account, setAccount] = useState();
  const [isKPIModelOpen, setIsKPIModelOpen] = useState(false);
  const jwtToken = localStorage.getItem("token");

  const accountsPerPage = 4;
  const API_URL = "http://127.0.0.1:5000";

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`${API_URL}/accounts`, {headers : { Authorization : jwtToken ? `Bearer ${jwtToken}` : undefined}});
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } 
    };
    fetchAccounts();
  }, []);


  const handleKPIPage = (account) => {
      setAccount(account)
      setIsKPIModelOpen(!isKPIModelOpen);
  }
  const handleToggle = () => {
    setIsKPIModelOpen(!isKPIModelOpen);
  }

  const deleteAccount = async (accountId) => {
    try {
      await axios.delete(`${API_URL}/account/${accountId}`);
      setAccounts(accounts.filter((account) => account.id !== accountId));
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const switchStatus = async (accountId) => {
    try {
      const response = await axios.put(
        `${API_URL}/account/${accountId}/swichStatus`
      );
      setAccounts(response.data);
    } catch (error) {
      console.error("Error deactivating account:", error);
    }
  };
  
  const updateKpi = async (accountId, payload) => {
    try {
      const response = await axios.post(
        `${API_URL}/kpi/${accountId}`, payload
      );
      setAccounts(response.data);
      handleToggle();
    } catch (error) {
      console.error("Error while updating KPIs:", error);
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const filteredAccounts = accounts.filter((account) =>
    account.screen_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = filteredAccounts.slice(
    indexOfFirstAccount,
    indexOfLastAccount
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box as="main" py={8} bgGradient="linear(135deg, #f5f6fa 0%, #c3cfe2 100%)">
    <Container  maxW="container.lg" height={"100vh"}>
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        All Accounts
      </Heading>
      <Center mb={6}>
        <Input
          width="300px"
          placeholder="Search Account"
          value={searchTerm}
          onChange={handleSearchChange}
          mr={2}
          bg={"white"}
        />
        <Button colorScheme="blue">
          <a href={`${API_URL}/login`} target="_blank">
            {" "}
            Add Account
          </a>
        </Button>
      </Center>
      <Center>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          mb={8}
          boxShadow="md"
          maxW="1000px"
          w="100%"
          bg={useColorModeValue("white", "gray.600")}
        >
          <AccountTable
            accounts={currentAccounts}
            deleteAccount={deleteAccount}
            switchStatus={switchStatus} 
            handleKPIPage={handleKPIPage}
          />
          <UpdateKpiModal
            isOpen={isKPIModelOpen}
            onClose={handleToggle}
            updateKpi={updateKpi}
            selectedAccount={account}
          /> 
        </Box>
      </Center>
      {/* Pagination controls */}
      <Center>
        <Button
          variant="outline"
          colorScheme="blue"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          mr={2}
        >
          Prev
        </Button>
        <Button
          variant="outline"
          colorScheme="blue"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentAccounts.length < accountsPerPage}
        >
          Next
        </Button>
      </Center>
    </Container>
    </Box>
  );
}

export default WorkspacePage;
