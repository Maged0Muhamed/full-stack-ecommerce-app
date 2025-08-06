import { HStack, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";

const CardSkeleton = () => {
  return (
    <Stack gap="6" maxW="xs">
      <Skeleton height="200px" />
      <HStack width="full">
        <SkeletonText noOfLines={2} />
      </HStack>
    </Stack>
  );
};
export default CardSkeleton;
