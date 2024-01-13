"use client";
import { useEffect } from "react";
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
import CodeEditor from "@uiw/react-textarea-code-editor";

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

export default function AddProgram({
  onClose,
  Category = [],
  selectedModal,
  programData,
}: any) {
  const [formState, action] = useFormState(actions.createProgram, {
    errors: {},
    isSuccess: false,
  });

  const Heading =
    selectedModal === "EditProgram" ? "Edit Program" : "Add Program";
  const ButtonTitle = selectedModal === "EditProgram" ? "Update" : "Save";

  useEffect(() => {
    if (formState.isSuccess) {
      onClose();
    }
  }, [formState]);

  return (
    <>
      <form action={action}>
        <ModalHeader className="flex flex-col gap-1">{Heading}</ModalHeader>
        <ModalBody>
          <div className="flex flex-row gap-4 p-4 w-full">
            <div className="flex flex-col w-1/2">
              <Input
                name="problem_statement"
                label=""
                labelPlacement="outside"
                placeholder="eg WAP to print sum of two numbers"
                className="mb-4"
                isInvalid={!!formState?.errors?.problem_statement}
                errorMessage={formState?.errors?.problem_statement?.join(", ")}
                defaultValue={programData?.problem_statement}
              />
              <Select
                name="categorySelected"
                label="Select an Category"
                fullWidth
                className="mb-4"
                errorMessage={formState?.errors?.CategoryID?.join(", ")}
                defaultSelectedKeys={
                  programData ? [programData?.CategoryID] : ""
                }
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
                defaultSelectedKeys={
                  programData ? [programData?.levelSelected] : ""
                }
              >
                {Level.map((lev: { label: string; value: string }) => (
                  <SelectItem key={lev.label} value={lev.value}>
                    {lev.value}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="w-1/2">
              {/* <Textarea
                name="code"
                errorMessage={formState?.errors?.code?.join(", ")}
                className="textAreaCustom"
                defaultValue={programData?.code || ""}
                height={"auto"}
                disableAutosize={true}
                size="lg"
              /> */}
              <CodeEditor
                defaultValue={programData?.code || ""}
                name="code"
                className="textAreaCustom"
                // value={code}
                language="js"
                placeholder="Please enter JS code."
                // onChange={(evn) => setCode(evn.target.value)}
                padding={15}
                style={{
                  backgroundColor: "#f5f5f5",
                  fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                }}
              />
            </div>
            <div style={{ display: "none" }}>
              <Input
                name="codeId"
                label=""
                placeholder=""
                className=""
                defaultValue={programData === null ? "ADD" : programData?.id}
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
          <FormButton>{ButtonTitle}</FormButton>
        </ModalFooter>
      </form>
    </>
  );
}
