
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Container,
	Heading,
	Center,
	Input,
	Button,
	Box,
	useDisclosure,
	Spinner,
} from "@chakra-ui/react";
import AddAccountForm from "./AddAccountForm"
import AccountTable from "./AccountTable";
import UpdateKeywordModal from "./UpdateKeywordModal";
import UpdatePromptModal from "./UpdatePromptModal";
import UpdateKpiModal from "./UpdateKpiModal";

function HomePage() {
	const [accounts, setAccounts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedAccount, setSelectedAccount] = useState(null);
	const accountsPerPage = 4;
	const API_URL = 'http://127.0.0.1:5000'


	const {
		isOpen: isKeywordModalOpen,
		onOpen: onKeywordModalOpen,
		onClose: onKeywordModalClose,
	} = useDisclosure();
	const {
		isOpen: isPromptModalOpen,
		onOpen: onPromptModalOpen,
		onClose: onPromptModalClose,
	} = useDisclosure();
	const {
		isOpen: isAddAccountModalOpen,
		onOpen: onAddAccountModalOpen,
		onClose: onAddAccountModalClose,
	} = useDisclosure();
	const {
		isOpen: isKpiModalOpen,
		onOpen: onKpiModalOpen,
		onClose: onKpiModalClose,
	} = useDisclosure();

	useEffect(() => {
		const fetchAccounts = async () => {
			try {
				const response = await axios.get(`${API_URL}/accounts`);
				setAccounts(response.data);
			} catch (error) {
				console.error("Error fetching accounts:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchAccounts();
	}, []);

	const addAccount = async (account) => {
		try {
			const response = await axios.post(
				`${API_URL}/account`,
				account
			);
			setAccounts([...accounts, response.data]);
			onAddAccountModalClose();
		} catch (error) {
			console.error("Error adding account:", error);
		}
	};

	const deleteAccount = async (accountId) => {
		try {
			await axios.delete(`${API_URL}/account/${accountId}`);
			setAccounts(accounts.filter((account) => account.id !== accountId));
		} catch (error) {
			console.error("Error deleting account:", error);
		}
	};

	const deactivateAccount = async (accountId) => {
		try {
			const response = await axios.put(
				`${API_URL}/account/${accountId}/deactivate`
			);

			setAccounts(
				accounts.map((account) =>
					account.id === accountId
						? { ...account, status: response.data.status }
						: account
				)
			);
		} catch (error) {
			console.error("Error deactivating account:", error);
		}
	};

	const updateKeyword = async (accountId, newKeyword) => {
		try {
			const response = await axios.post(
				`${API_URL}/keyword/${accountId}`,
				{ keyword: newKeyword }
			);
			setAccounts(
				accounts.map((account) =>
					account.id === accountId
						? { ...account, keywords: response.data.keywords }
						: account
				)
			);
			onKeywordModalClose();
		} catch (error) {
			console.error("Error updating keyword:", error);
		}
	};

	const updatePrompt = async (accountId, newPrompt) => {
		try {
			const response = await axios.post(
				`${API_URL}/prompt/${accountId}`,
				{ prompt: newPrompt }
			);
			setAccounts(
				accounts.map((account) =>
					account.id === accountId
						? { ...account, prompt: response.data.prompt }
						: account
				)
			);
			onPromptModalClose();
		} catch (error) {
			console.error("Error updating prompt:", error);
		}
	};

	// Handle search term change
	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
		setCurrentPage(1); // Reset to page 1 when search term changes
	};

  const updateKpi = async (accountId, newKpi) => {
    try {
      const response = await axios.post(`${API_URL}/kpi/${accountId}`, { kpi: newKpi });
      setAccounts(accounts.map(account =>
        
        account.id === accountId ? { ...account, kpi: response.data.kpi } : account
        
      ));
      onKpiModalClose();
    } catch (error) {
      console.error('Error updating KPI:', error);
    }
  };
  

	const openKpiModalHandler = (account) => {
		setSelectedAccount(account);
		onKpiModalOpen();
	};

	// Filter accounts based on search term
	const filteredAccounts = accounts.filter((account) =>
		account.screen_name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Pagination logic
	const indexOfLastAccount = currentPage * accountsPerPage;
	const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
	const currentAccounts = filteredAccounts.slice(
		indexOfFirstAccount,
		indexOfLastAccount
	);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	if (loading) {
		return (
			<Center>
				<Spinner size="xl" />
			</Center>
		);
	}

	return (
		<Container py={8} maxW="container.lg">
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
				/>
				<Button colorScheme="blue">
					<a
						href={`${API_URL}/login`}
						target="_blank"
					>
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
				>
					<AccountTable
						accounts={currentAccounts}
						deleteAccount={deleteAccount}
						openKeywordModal={(account) => {
							setSelectedAccount(account);
							onKeywordModalOpen();
						}}
						openPromptModal={(account) => {
							setSelectedAccount(account);
							onPromptModalOpen();
						}}
						deactivateAccount={deactivateAccount} // Pass deactivateAccount function
						openKpiModal={openKpiModalHandler}
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
			<AddAccountForm
				isOpen={isAddAccountModalOpen}
				onClose={onAddAccountModalClose}
				addAccount={addAccount}
			/>
			<UpdateKeywordModal
				isOpen={isKeywordModalOpen}
				onClose={onKeywordModalClose}
				updateKeyword={updateKeyword}
				selectedAccount={selectedAccount}
			/>
			<UpdatePromptModal
				isOpen={isPromptModalOpen}
				onClose={onPromptModalClose}
				updatePrompt={updatePrompt}
				selectedAccount={selectedAccount}
			/>
      <UpdateKpiModal
        isOpen={isKpiModalOpen}
        onClose={onKpiModalClose}
        updateKpi={updateKpi}
        selectedAccount={selectedAccount}
      />

		</Container>
	);
}

export default HomePage;
