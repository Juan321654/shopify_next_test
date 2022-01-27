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
  Layout,
  CalloutCard,
} from "@shopify/polaris";
// https://polaris.shopify.com/components/structure/page

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Dashboard from "../components/Dashboard";

import { Provider, ResourcePicker } from "@shopify/app-bridge-react";
// https://shopify.dev/apps/tools/app-bridge/getting-started

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
        title="App configuration"
        // primaryAction={{
        //   content: "Select product",
        //   onAction: () => setOpenRes(true),
        // }}
      >
          <Card>
            <Card.Section>
              <Heading>
                Configure connection to PI™ - Commerce Desktop Suite
              </Heading>
              <br />
              <p>
                Shopify store management has never been easier. Connect [Store]
                to PI™ - Commerce Desktop Suite to unlock your store's potential
                today!{" "}
              </p>
              <br />
              <div style={{ display: "flex", gap: "5px" }}>
                <Button>Learn more</Button>
                <Button type="button" onClick={() => router.push("/config")}>
                  Connect
                </Button>
                <Button type="button">Download</Button>
              </div>
            </Card.Section>
          </Card>
          <br />
        <Dashboard />
      </Page>

      {/* <Page
        title="App configuration"
        primaryAction={{
          content: "Select product",
          onAction: () => setOpenRes(true),
        }}
      >
        <CalloutCard
          title="Configure connection to PI™ - Commerce Desktop Suite"
          primaryAction={{  }}
          secondaryAction={{
            content: "Learn more about PI™ - Commerce Desktop Suite",
          }}
          onDismiss={() => {}}
        >
          <p>
            Shopify store management has never been easier. Connect [Store] to
            PI™ - Commerce Desktop Suite to unlock your store's potential today!{" "}
          </p>
          <Button type="button" onClick={() => router.push("/config")}>
            Config
          </Button>
        </CalloutCard>
      </Page> */}

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
        <Button type="button" onClick={() => router.push("/config")}>
          Config
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
