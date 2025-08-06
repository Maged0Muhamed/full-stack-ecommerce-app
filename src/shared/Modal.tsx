import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { type ReactNode } from "react";
interface IProp {
  isModalOpened: boolean;
  isLoading: boolean;
  titleText: string;
  cancelText: string;
  okText: string;
  children: ReactNode;
  setIsModalOpened: (val: boolean) => void;
  onOkClick: () => void;
  onCancelClick: () => void;
}
const CustomModal = ({
  titleText,
  okText,
  cancelText,
  children,
  isModalOpened,
  setIsModalOpened,
  isLoading,
  onCancelClick,
  onOkClick,
}: IProp) => {
  return (
    <Dialog.Root
      lazyMount
      open={isModalOpened}
      onOpenChange={e => setIsModalOpened(e.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title> {titleText}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{children}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onCancelClick}>
                  {cancelText}
                </Button>
              </Dialog.ActionTrigger>
              <Button loading={isLoading} onClick={onOkClick}>
                {okText}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
export default CustomModal;
