import React from "react";
import {
  Heading,
  Page,
  Button,
  Card,
  Stack,
  TextField,
  DataTable,
  EmptyState,
  Toast,
  Frame,
  Form,
  FormLayout,
} from "@shopify/polaris";
import { useRouter } from "next/router";

function config() {
  const router = useRouter();
  return (
    <Page>
      <Card>
        <Card.Section>
          <Heading>Store connection settings</Heading>
          <br />
          <TextField
            label="Store name"
            // value={appendToTitle}
            // onChange={setAppendToTitle}
          />
          <br />
          <TextField
            // onBlur={() => navigator.clipboard.writeText("someLongId")}
            label="Store password"
            value={"hfjkdhfask3483h378dfh3uhdue"}
            // onChange={setAppendToDescription}
            // multiline={3}
          />
          <br />
          <TextField
            // onBlur={() => navigator.clipboard.writeText("someLongId")}
            label="API key"
            value={"hfjkdhfask3483h378dfh3uhdue"}
            // onChange={setAppendToDescription}
            // multiline={3}
          />
          <br />
          <Button onClick={() => router.push("/")}>Back</Button>
        </Card.Section>
      </Card>
    </Page>
  );
}

export default config;
