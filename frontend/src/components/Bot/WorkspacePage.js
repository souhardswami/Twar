import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Container,
  Heading,
  Center,
  Input,
  Button,
  Box,
  // useColorModeValue,
  Text, 
  // useToast,
  Spinner
} from "@chakra-ui/react";
import AccountTable from "./AccountTable";
import UpdateKpiModal from "./UpdateKpiModal";
import { toaster } from "../utils/Toaster";

const WorkspacePage = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [account, setAccount] = useState();
  const [isKPIModelOpen, setIsKPIModelOpen] = useState(false);
  const [selectedRagFile, setSelectedRagFile] = useState(null);
  const jwtToken = localStorage.getItem("token");
  const firstRenderRef = useRef(true);
  const [isLoading, setIsLoading] = useState(false)
  // const toast = useToast();

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

  useEffect (() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      handleRagUpload();
    }
  }, [selectedRagFile])

  const handleRagUpload = async () => {
    if (!selectedRagFile) {
      alert('Please select a file to upload');
      return;
    }
    const formData = new FormData();
    formData.append('document', selectedRagFile);
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/upload-rag-document`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${jwtToken}`
        }
      })
      toaster.create({
        title: "Success",
        description: "Brand guidelines uploaded successfully",
        type: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Upload failed:", error);
      toaster.create({
        title: "Error",
        description: "Failed to upload document",
        type: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box as="main" py={8} >
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
          // bg={"white"}
        />
        <Button colorPalette="blue">
          <a href={`${API_URL}/login`} target="_blank">
            {" "}
            Add Account
          </a>
        </Button>
        <Box
          as="label"
          w="7%"
          cursor="pointer"
          py={2}
          px={2}
          mx={2}
          borderRadius="md"
          border="1px solid"
          // borderColor={useColorModeValue("gray.200", "gray.700")}
          // bg={useColorModeValue("white", "gray.800")}
          _hover={{
            borderColor: "teal.600",
            bg: "teal.600",
          }}
          transition="all 0.2s ease"
        >
          <Input
            type="file"
            // ref={inputRef}
            onChange={(e) => setSelectedRagFile(e.target.files[0])}
            accept=".pdf,.docx,.txt,.csv,"
            display="none"
            aria-label="Upload brand guidelines document"
          />
          <Text
            fontSize="sm"
            fontWeight="medium"
            // color={useColorModeValue("gray.600", "gray.300")}
          >
           Upload  {isLoading ? <Spinner
              thickness='4px'
              speed='1s'
              color='red.600'
              size='sm'
            /> : "📂" }
          </Text>
        </Box> 
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
          // bg={useColorModeValue("white", "gray.600")}
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
          colorPalette="blue"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          mr={2}
        >
          Prev
        </Button>
        <Button
          variant="outline"
          colorPalette="blue"
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
