"use client";
import React, { useState, memo, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Modal, ModalContent, Button, useDisclosure } from "@nextui-org/react";
import AddCategory from "../../components/Modal/AddCategory";
import AddProgram from "../../components/Modal/AddProgram";
import { AiFillDelete } from "react-icons/ai";
import { handleRemoveCategory, handleRemoveCode } from "@/utils/removeData";

// Recursive Tree component
const TreeNode = ({
  childItems,
  keyVal,
  item,
  onOpen,
  setSelectModal,
  setProgramData,
}: {
  childItems?: any;
  keyVal: string;
  item?: any;
  onOpen: () => void;
  setSelectModal: Dispatch<SetStateAction<string>>;
  setProgramData: Dispatch<SetStateAction<any>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    if (item) {
      setProgramData(item);
      setSelectModal("EditProgram");
      onOpen();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <div className="flex justify-between px-3 py-1 bottom-1">
        <div className="flex flex-row flex-1" onClick={toggleOpen}>
          {!item && (
            <Image
              className={`my-1 mx-1 ${
                isOpen ? "rotate-90 filter-green" : "filter-yellow"
              }`}
              priority
              src="/Arrow.svg"
              height={20}
              width={20}
              alt=">"
            />
          )}{" "}
          <span className="ml-1 cursor-pointer">{keyVal}</span>
        </div>
        <div>
          {" "}
          <AiFillDelete
            onClick={() =>
              item
                ? handleRemoveCode(item?.id)
                : handleRemoveCategory(childItems[0]?.CategoryID)
            }
            style={{ fontSize: "22px", cursor: "pointer" }}
          />{" "}
        </div>
      </div>

      {isOpen && childItems && (
        <div style={{ marginLeft: "20px" }}>
          {childItems.map((childNode: any) => (
            <TreeNode
              key={childNode.id}
              keyVal={childNode.problem_statement}
              item={childNode}
              onOpen={onOpen}
              setSelectModal={setSelectModal}
              setProgramData={setProgramData}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const DsaPage = ({ Category, listOfPrograms }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedModal, setSelectModal] = useState("");
  const [programData, setProgramData] = useState(null);

  return (
    <div>
      <div className="flex flex-row justify-end mr-2 mt-4">
        <Button
          className="mr-2"
          color="warning"
          onClick={() => {
            setSelectModal("AddCategory");
            onOpen();
          }}
        >
          Add Category
        </Button>
        <Button
          color="warning"
          onClick={() => {
            setSelectModal("AddProgram");
            onOpen();
          }}
        >
          Add Program
        </Button>
        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          classNames={{
            backdrop:
              "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          }}
          size={selectedModal === "AddCategory" ? "md" : "full"}
          onClose={() => setProgramData(null)}
        >
          <ModalContent>
            {(onClose) =>
              selectedModal === "AddCategory" ? (
                <AddCategory onClose={onClose} />
              ) : (
                <AddProgram
                  onClose={() => {
                    setProgramData(null);
                    onClose();
                  }}
                  Category={Category}
                  selectedModal={selectedModal}
                  programData={programData}
                />
              )
            }
          </ModalContent>
        </Modal>
      </div>
      {Object.entries(listOfPrograms).map((ele) => {
        return (
          <TreeNode
            key={ele[0]}
            keyVal={ele[0]}
            childItems={ele[1]}
            onOpen={onOpen}
            setSelectModal={setSelectModal}
            setProgramData={setProgramData}
          />
        );
      })}
    </div>
  );
};

export default memo(DsaPage);
