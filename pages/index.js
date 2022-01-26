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
} from "@shopify/polaris";
import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { Provider, ResourcePicker } from "@shopify/app-bridge-react";

import { ProductUpdateMutation } from "../graphql/ProductUpdate";
import { useMutation } from "react-apollo";

const Index = () => {
  const [openRes, setOpenRes] = useState(false);
  const [appendToTitle, setAppendToTitle] = useState("");
  const [appendToDescription, setAppendToDescription] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const router = useRouter();

  const [updateProduct] = useMutation(ProductUpdateMutation);

  function makeCall() {
    axios
      .get("http://localhost:4000/api/v1/Userbuiltshopify")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const handleSelection = (resources) => {
    const idFromResources = resources.selection.map((product) => product.id);
    console.log(idFromResources);
    setOpenRes(false);
  };

  const productTableDisplayData = useMemo(
    () =>
      products.map((product) => [
        product.id,
        product.title,
        `${product.title}${appendToTitle}`,
        product.descriptionHtml,
        `${product.descriptionHtml}${appendToDescription}`,
      ]),
    [products, appendToTitle, appendToDescription]
  );

  const submitHandler = useCallback(() => {
    let count = 0;
    const runMutation = (product) => {
      updateProduct({
        variables: {
          input: {
            descriptionHtml: `${product.descriptionHtml}${appendToDescription}`,
            title: `${product.title}${appendToTitle}`,
            id: product.id,
          },
        },
      }).then((data) => {
        console.log("Updated Product", count, data);
        count++;
        if (products[count]) runMutation(products[count]);
        else {
          console.log("All products updated");
          setShowToast(true);
        }
      });
    };
    runMutation(products[count]);
  }, [products, appendToTitle, appendToDescription]);

  const toastMarkup = showToast ? (
    <Toast
      content="Update Succesful"
      onDismiss={() => setShowToast(false)}
      duration={4000}
    />
  ) : null;

  return (
    <>
      <Page
        title="Product selector"
        primaryAction={{
          content: "Select product",
          onAction: () => setOpenRes(true),
        }}
      >
        <ResourcePicker
          resourceType="Product"
          open={openRes}
          onCancel={() => setOpenRes(false)}
          onSelection={(resources) => handleSelection(resources)}
        />
        <Heading>Shopify App Test Page</Heading>
        <Button onClick={makeCall}>Add product</Button>
        <Button type="button" onClick={() => router.push("/localpreview")}>
          Click me
        </Button>
      </Page>
      <Frame>
        <Page>
          <Heading>Product Updater</Heading>
          <Card>
            <Card.Section>
              <Stack vertical>
                <TextField
                  label="Append to title"
                  value={appendToTitle}
                  onChange={setAppendToTitle}
                />
                <TextField
                  label="Append to description"
                  value={appendToDescription}
                  onChange={setAppendToDescription}
                  multiline={3}
                />
                <ResourcePicker
                  resourceType="Product"
                  showVariant={false}
                  open={pickerOpen}
                  onCancel={() => setPickerOpen(false)}
                  onSelection={(resources) => setProducts(resources.selection)}
                />
                <Button primary onClick={() => setPickerOpen(true)}>
                  Select Products
                </Button>
              </Stack>
            </Card.Section>
            <Card.Section>
              {productTableDisplayData.length ? (
                <DataTable
                  columnContentTypes={["text", "text", "text", "text", "text"]}
                  headings={[
                    "ID",
                    "Old Title",
                    "New Title",
                    "Old Description",
                    "New Description",
                  ]}
                  rows={productTableDisplayData}
                />
              ) : (
                <EmptyState heading="No products selected" />
              )}
            </Card.Section>
            <Card.Section>
              <Button
                primary
                onClick={submitHandler}
                disabled={!products.length}
              >
                Submit
              </Button>
            </Card.Section>
          </Card>
          {toastMarkup}
        </Page>
      </Frame>
    </>
  );
};

export default Index;
