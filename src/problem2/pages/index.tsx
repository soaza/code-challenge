import type { NextPage } from "next";

import { TextInput, Button, Group, Box, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useRouter } from "next/router";

interface IFormProps {
  address: string;
  amount: undefined | number;
  phone: undefined | number;
  otp: undefined | number;
}

const Home: NextPage = () => {
  const form = useForm<IFormProps>({
    initialValues: {
      address: "",
      amount: undefined,
      phone: undefined,
      otp: undefined,
    },
    validate: {
      amount: (value: number) =>
        value > 0 ? null : "Amount need to be more than 0",
    },
  });

  const router = useRouter();

  const [verifyOTP, setVerifyOTP] = useState(false);

  return (
    <Box
      sx={{
        maxWidth: 300,
        marginTop: "20vh",
      }}
      mx="auto"
    >
      <form
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
        onSubmit={(e) => {
          e.preventDefault();
          form.validate();
          if (!form.isValid()) {
            return;
          }

          router.push({
            pathname: "/success/[transaction]",
            query: {
              ...form.values,
              // random transaction id
              transaction: Math.floor(Math.random() * 1000),
            },
          });
        }}
      >
        <TextInput
          required
          withAsterisk
          label="ETH Address"
          description="Please enter ETH address"
          {...form.getInputProps("address")}
        />

        <NumberInput
          required
          hideControls
          withAsterisk
          label="Amount to send"
          description="Please enter amount of ETH to send"
          precision={10}
          icon="$"
          {...form.getInputProps("amount")}
        />

        <NumberInput
          required
          hideControls
          withAsterisk
          label="OTP Authentication"
          type="number"
          description="Please enter the phone number registered"
          {...form.getInputProps("phone")}
        />

        <Button onClick={() => setVerifyOTP(true)} loading={verifyOTP}>
          Get OTP
        </Button>

        <NumberInput
          required
          hideControls
          withAsterisk
          label="OTP"
          type="number"
          description="Please enter the OTP that has been sent"
          disabled={!verifyOTP}
          {...form.getInputProps("otp")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default Home;
