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
import { SHOP_INFO } from '../currentShop'

function config() {
  const router = useRouter();
  // const SHOP = process.env.NEXT_PUBLIC_SHOP;
  // const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  return (
    <Page>
      <Card>
        <Card.Section>
          <Heading>Store connection settings</Heading>
          <br />
          <TextField
            label="Store name"
            value={SHOP_INFO.shop.replace(".myshopify.com", "")}
            // onChange={setAppendToTitle}
          />
          <br />
          <TextField
            // onBlur={() => navigator.clipboard.writeText("someLongId")}
            label="Access Token"
            value={SHOP_INFO.accessToken}
            type="password"
            onFocus={(e) => (e.target.type = "text")}
            onBlur={(e) => (e.target.type = "password")}
            // onChange={setAppendToDescription}
            // multiline={3}
          />
          <br />
          {/* <TextField
            // onBlur={() => navigator.clipboard.writeText("someLongId")}
            label="API key"
            value={"hfjkdhfask3483h378dfh3uhdue"}
            // onChange={setAppendToDescription}
            // multiline={3}
          /> */}
          <br />
          <Button onClick={() => router.push("/")}>Back</Button>
        </Card.Section>
      </Card>
    </Page>
  );
}

export default config;
