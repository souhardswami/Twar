import React, { useState, useEffect } from "react";
import {
  Portal,
  Button,
  Input,
  Box,
  Text,
  Dialog,
  Field,
  Flex,
} from "@chakra-ui/react";

const UpdateKpiModal = ({ isOpen, onClose, updateKpi, selectedAccount }) => {
  const [weeklyKpi, setWeeklyKpi] = useState("");
  const [dailyKpi, setDailyKpi] = useState("");

  useEffect(() => {
    if (selectedAccount) {
      setWeeklyKpi(selectedAccount.weekly);
      setDailyKpi(selectedAccount.daily);
    }
  }, [selectedAccount]);

  const handleUpdateKpi = () => {
    updateKpi(selectedAccount.id, { weekly: weeklyKpi, daily: dailyKpi });
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => (details.open ? null : onClose())}
    >
      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                Update KPI for{" "}
                <Text as="i" display="inline">
                  {selectedAccount ? selectedAccount.screen_name : ""}
                </Text>
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.CloseTrigger onClick={onClose} />

            <Dialog.Body>
              <Box py={4}>
                <Field.Root>
                  <Field.Label>Daily KPI</Field.Label>
                  <Input
                    value={dailyKpi}
                    onChange={(e) => setDailyKpi(e.target.value)}
                  />
                </Field.Root>

                <Field.Root mt={4}>
                  <Field.Label>Weekly KPI</Field.Label>
                  <Input
                    value={weeklyKpi}
                    onChange={(e) => setWeeklyKpi(e.target.value)}
                  />
                </Field.Root>
              </Box>
            </Dialog.Body>
            <Dialog.Footer>
              <Flex justifyContent="flex-end">
                <Button colorScheme="blue" mr={3} onClick={handleUpdateKpi}>
                  Update KPI
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Close
                </Button>
              </Flex>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default UpdateKpiModal;
