import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";

export default function AddCategory({ onClose }: any) {
  const [formState, action] = useFormState(actions.createCategory, {
    errors: {},
  });
  console.log("formState -->", formState);
  console.log("action -->", action);

  return (
    <>
      <form action={action}>
        <ModalHeader className="flex flex-col gap-1">Add Category</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4 p-4">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
            />

            {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" variant="light" onPress={onClose}>
            Close
          </Button>
          <FormButton>Save</FormButton>
        </ModalFooter>
      </form>
    </>
  );
}
