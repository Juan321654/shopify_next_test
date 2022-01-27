import React from "react";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { Button } from "@shopify/polaris";

function ProductResourcePicker({ isOpen, openState, setData }) {
  return (
    <>
      <ResourcePicker
        resourceType="Product"
        showVariant={false}
        open={isOpen}
        onCancel={() => openState(false)}
        onSelection={(resources) => setData(resources.selection)}
      />
      <Button onClick={() => openState(true)}>Select Product</Button>
    </>
  );
}

export default ProductResourcePicker;
