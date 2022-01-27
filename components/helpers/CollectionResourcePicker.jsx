import React from "react";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { Button } from "@shopify/polaris";

function CollectionResourcePicker({ isOpen, openState, setData }) {
  return (
    <>
      <ResourcePicker
        resourceType="Collection"
        showVariant={false}
        open={isOpen}
        onCancel={() => openState(false)}
        onSelection={(resources) => setData(resources.selection)}
      />
      <Button onClick={() => openState(true)}>Select Collection</Button>
    </>
  );
}

export default CollectionResourcePicker;
