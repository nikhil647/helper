import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import FormButton from "@/components/common/form-button";
import { Select, SelectItem } from "@nextui-org/react";
import * as actions from "@/actions";
import { useFormState } from "react-dom";

const Level = [
  {
    label: "Easy",
    value: "Easy",
  },
  {
    label: "Medium",
    value: "Medium",
  },
  {
    label: "Hard",
    value: "Hard",
  },
];

export default function AddProgram({ onClose, Category }: any) {
  const [formState, action] = useFormState(actions.createProgram, {
    errors: {},
    isSuccess: false,
  });

  console.log("formState -->", formState);

  return (
    <>
      <form action={action}>
        <ModalHeader className="flex flex-col gap-1">Add Programs</ModalHeader>
        <ModalBody>
          <div className="flex flex-row gap-4 p-4 w-full">
            <div className="flex flex-col w-1/2">
              <h3 className="text-lg mb-4">Create a Program</h3>
              <Input
                name="problem_statement"
                label=""
                labelPlacement="outside"
                placeholder="eg WAP to print sum of two numbers"
                className="mb-4"
                isInvalid={!!formState?.errors?.problem_statement}
                errorMessage={formState?.errors?.problem_statement?.join(", ")}
              />
              <Select
                name="categorySelected"
                label="Select an Category"
                fullWidth
                className="mb-4"
                errorMessage={formState?.errors?.categorySelected?.join(", ")}
              >
                {Category.map((cat: { id: string; categoryName: string }) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.categoryName}
                  </SelectItem>
                ))}
              </Select>
              <Select
                name="levelSelected"
                label="Select an Level"
                fullWidth
                className="mb-4"
                errorMessage={formState?.errors?.levelSelected?.join(", ")}
              >
                {Level.map((lev: { label: string; value: string }) => (
                  <SelectItem key={lev.label} value={lev.value}>
                    {lev.value}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="w-1/2">
              <Textarea
                name="code"
                errorMessage={formState?.errors?.levelSelected?.join(", ")}
                className="textAreaCustom"
              />
            </div>

            {/* {formState?.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null} */}
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
