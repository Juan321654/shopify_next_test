import React, { useState, useMemo } from "react";
import { Card, DataTable, Page, Button } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import ProductResourcePicker from "./helpers/ProductResourcePicker";
import CollectionResourcePicker from "./helpers/CollectionResourcePicker";

export default function SortableDataTableExample() {
  let apiData = [
    { product: "car", price: 500, sku: "eRt665", qty: 400, sale: 10000 },
    { product: "bike", price: 200, sku: "aRt665", qty: 200, sale: 50000 },
    { product: "sweater", price: 30, sku: "yit665", qty: 700, sale: 3000 },
    { product: "ball", price: 10, sku: "qpt665", qty: 400, sale: 2000 },
  ];

  const [data, setData] = useState([]);
  // const [pickerOpen, setPickerOpen] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [openCollections, setOpenCollections] = useState(false);
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);

  console.log(data);

  const productTableDisplayData = useMemo(() => {
    return data.map((product) => [
      "",
      product["vendor"],
      product["variants"][0]["sku"] || "",
      product["title"],
      product["qty"],
      product["sale"],
    ]);
  }, [data]);

  const handleSort = (idx, direction) => {
    if (direction === "ascending") {
      const sorted = [...data].sort((a, b) => {
        let headers = Object.keys(a);
        let textCheckA =
          typeof a[headers[idx]] === "string"
            ? a[headers[idx]].toLowerCase()
            : a[headers[idx]];
        let textCheckB =
          typeof b[headers[idx]] === "string"
            ? b[headers[idx]].toLowerCase()
            : b[headers[idx]];
        return textCheckA > textCheckB ? 1 : -1;
      });
      setData(sorted);
    }
    if (direction === "descending") {
      const sorted = [...data].sort((a, b) => {
        let headers = Object.keys(a);
        let textCheckA =
          typeof a[headers[idx]] === "string"
            ? a[headers[idx]].toLowerCase()
            : a[headers[idx]];
        let textCheckB =
          typeof b[headers[idx]] === "string"
            ? b[headers[idx]].toLowerCase()
            : b[headers[idx]];
        return textCheckA < textCheckB ? 1 : -1;
      });
      setData(sorted);
    }
  };

  return (
    // <Page title="Sales by product">
    <Card title="Products">
      <Card.Section>
        <div style={{ display: "flex", gap: "5px" }}>
          {/* <ProductResourcePicker
            openState={setOpenProducts}
            setData={setData}
            isOpen={openProducts}
          /> */}
          <CollectionResourcePicker
            openState={setOpenCollections}
            setData={setCollections}
            isOpen={openCollections}
          />
        </div>
      </Card.Section>
      {data.length > 0 && (
        <DataTable
          columnContentTypes={[
            "text",
            "text",
            "text",
            "text",
            "text",
            "text",
            "text",
            "text",
            "text",
            "text",
          ]}
          headings={[
            "Main Image",
            "Vendor",
            "SKU",
            "Title",
            "Status",
            "Sales Channel",
            "Collection",
            "Published",
            "Cost",
            "Sell",
          ]}
          rows={productTableDisplayData}
          // totals={['', '', '', 255, '$155,830.00']}
          sortable={[true, true, true, true, true]}
          defaultSortDirection="descending"
          initialSortColumnIndex={0}
          onSort={handleSort}
        />
      )}
    </Card>
    // </Page>
  );
}
