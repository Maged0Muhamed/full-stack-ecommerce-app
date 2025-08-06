import { Skeleton, Table } from "@chakra-ui/react";
const items = Array.from({ length: 1 }, (_, idx: number) => idx + 1);
const DashboardProductsTableSkeletoon = () => {
  return (
    <Table.Root size="sm">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>
            <Skeleton h="15px" />
          </Table.ColumnHeader>
          <Table.ColumnHeader>
            <Skeleton h="15px" />
          </Table.ColumnHeader>
          <Table.ColumnHeader>
            <Skeleton h="15px" />
          </Table.ColumnHeader>
          <Table.ColumnHeader>
            <Skeleton h="15px" />
          </Table.ColumnHeader>
          <Table.ColumnHeader>
            <Skeleton h="15px" />
          </Table.ColumnHeader>
          <Table.ColumnHeader>
            <Skeleton h="15px" />
          </Table.ColumnHeader>
          <Table.ColumnHeader w="50px">
            <Skeleton
              h="30px"
              w="50px"
              variant="shine"
              css={{
                "--start-color": "colors.red.300",
                "--end-color": "colors.red.500",
              }}
            />
          </Table.ColumnHeader>
          <Table.ColumnHeader w="50px">
            <Skeleton
              h="30px"
              w="50px"
              variant="shine"
              css={{
                "--start-color": "colors.blue.300",
                "--end-color": "colors.blue.500",
              }}
            />
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map(id => (
          <Table.Row key={id}>
            <Table.Cell>
              <Skeleton h="15px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton h="15px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton h="15px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton h="15px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton h="15px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton h="15px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton
                h="30px"
                w="50px"
                variant="shine"
                css={{
                  "--start-color": "colors.red.300",
                  "--end-color": "colors.red.500",
                }}
              />
            </Table.Cell>
            <Table.Cell>
              <Skeleton
                h="30px"
                w="50px"
                variant="shine"
                css={{
                  "--start-color": "colors.blue.300",
                  "--end-color": "colors.blue.500",
                }}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default DashboardProductsTableSkeletoon;
