import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';

const UpdateKpiModal = ({ isOpen, onClose, updateKpi, selectedAccount }) => {
  const [weeklyKpi, setWeeklyKpi] = useState('');
  const [dailyKpi, setDailyKpi] = useState('');

  useEffect(() => {
    if (selectedAccount) {
      setWeeklyKpi(selectedAccount.kpi.weekly);
      setDailyKpi(selectedAccount.kpi.daily);
    }
  }, [selectedAccount]);

  const handleUpdateKpi = () => {
    updateKpi(selectedAccount.id, { weekly: weeklyKpi, daily: dailyKpi });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update KPI for <i>{selectedAccount ? selectedAccount.screen_name : ''}</i></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Weekly KPI</FormLabel>
            <Input value={weeklyKpi} onChange={(e) => setWeeklyKpi(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Daily KPI</FormLabel>
            <Input value={dailyKpi} onChange={(e) => setDailyKpi(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpdateKpi}>
            Update KPI
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateKpiModal;
