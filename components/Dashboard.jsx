import { Card, Layout, ResourceList, TextStyle, Thumbnail } from "@shopify/polaris";
import SortableDataTableProducts from "./SortTableProducts";

function Dashboard() {
  return (
    <Layout>
      <Layout.Section oneThird>
        <Card title="Import products" actions={[{ content: "Manage" }]}>
          <Card.Section>
            <TextStyle variation="subdued">455 units available</TextStyle>
          </Card.Section>
          <Card.Section title="Items">
            <ResourceList
              resourceName={{ singular: "product", plural: "products" }}
              items={[
                {
                  id: 343,
                  url: "produdcts/343",
                  name: "Black & orange scarf",
                  sku: "9234194023",
                  quantity: "254",
                  media: (
                    <Thumbnail
                      source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                      alt="Black orange scarf"
                    />
                  ),
                },
                {
                  id: 258,
                  url: "produdcts/258",
                  name: "Tucan scarf",
                  sku: "9234194010",
                  quantity: "201",
                  media: (
                    <Thumbnail
                      source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                      alt="Tucan scarf"
                    />
                  ),
                },
              ]}
              renderItem={(item) => {
                const { id, url, name, sku, media, quantity } = item;

                return (
                  <ResourceList.Item
                    id={id}
                    url={url}
                    media={media}
                    accessibilityLabel={`View details for ${name}`}
                  >
                    <h3>
                      <TextStyle variation="strong">{name}</TextStyle>
                    </h3>
                    <div>SKU: {sku}</div>
                    <div>{quantity} available</div>
                  </ResourceList.Item>
                );
              }}
            />
          </Card.Section>
        </Card>
      </Layout.Section>
      <Layout.Section oneThird>
        <Card title="Update products" actions={[{ content: "Manage" }]}>
          <Card.Section>
            <TextStyle variation="subdued">301 units available</TextStyle>
          </Card.Section>
          <Card.Section title="Items">
            <ResourceList
              resourceName={{ singular: "product", plural: "products" }}
              items={[
                {
                  id: 344,
                  url: "produdcts/344",
                  name: "Black & orange scarf",
                  sku: "9234194023",
                  quantity: "100",
                  media: (
                    <Thumbnail
                      source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                      alt="Black orange scarf"
                    />
                  ),
                },
                {
                  id: 259,
                  url: "produdcts/259",
                  name: "Tucan scarf",
                  sku: "9234194010",
                  quantity: "201",
                  media: (
                    <Thumbnail
                      source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                      alt="Tucan scarf"
                    />
                  ),
                },
              ]}
              renderItem={(item) => {
                const { id, url, name, sku, media, quantity } = item;

                return (
                  <ResourceList.Item
                    id={id}
                    url={url}
                    media={media}
                    accessibilityLabel={`View details for ${name}`}
                  >
                    <h3>
                      <TextStyle variation="strong">{name}</TextStyle>
                    </h3>
                    <div>SKU: {sku}</div>
                    <div>{quantity} available</div>
                  </ResourceList.Item>
                );
              }}
            />
          </Card.Section>
        </Card>
      </Layout.Section>
      <Layout.Section>
        <SortableDataTableProducts />
      </Layout.Section>
    </Layout>
  );
}

export default Dashboard;
