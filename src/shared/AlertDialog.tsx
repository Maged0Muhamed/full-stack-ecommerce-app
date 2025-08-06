import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
interface IProp {
  isOpen: boolean;
  isLoading: boolean;
  setIsOpen: (val: boolean) => void;
  deleteHandler: () => void;
  titleText: string;
  descriptionText: string;
  cancelText: string;
  okText: string;
}
const AlertDialog = ({
  isOpen,
  isLoading,
  setIsOpen,
  titleText,
  descriptionText,
  cancelText,
  okText,
  deleteHandler,
}: IProp) => {
  return (
    <Dialog.Root
      role="alertdialog"
      lazyMount
      open={isOpen}
      onOpenChange={e => setIsOpen(e.open)}
    >
      {/* <Dialog.Trigger>
        <Button variant="outline" size="sm">
          Open Dialog
        </Button>
      </Dialog.Trigger> */}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{titleText}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>{descriptionText}</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">{cancelText}</Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette="red"
                onClick={deleteHandler}
                loading={isLoading}
              >
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
export default AlertDialog;
