import { ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

export default function AddProgram({ onClose }: any) {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
      <ModalBody>Add Program</ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button color="primary" onPress={onClose}>
          Action
        </Button>
      </ModalFooter>
    </>
  );
}
