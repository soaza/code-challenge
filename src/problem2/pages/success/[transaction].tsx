import { Badge, Box, Button, Card, Group, Text } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

export const SuccessPage = () => {
  const router = useRouter();
  const { transaction, amount } = router.query;

  return (
    <Box
      sx={{
        maxWidth: 300,
        marginTop: "20vh",
      }}
      mx="auto"
    >
      <Card
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
      >
        <Badge
          style={{ width: "50%", placeSelf: "center" }}
          color="green"
          variant="light"
        >
          Success
        </Badge>

        <Text weight={500}>Transaction ID: {transaction}</Text>

        <Text size="sm" color="dimmed">
          {amount} ETH
        </Text>
      </Card>
    </Box>
  );
};

export default SuccessPage;
