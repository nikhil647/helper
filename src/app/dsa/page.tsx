"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import AddCategory from "../../components/Modal/AddCategory";
import AddProgram from "../../components/Modal/AddProgram";

// Sample data for the tree structure
const treeData = [
  {
    id: 2,
    name: "Array",
    children: [
      {
        id: 4,
        name: "WAP to print sum of two numbers",
        children: [],
      },
      {
        id: 5,
        name: "WAP to print sum of three numbers",
        children: [],
      },
    ],
  },
  {
    id: 3,
    name: "Heap",
    children: [],
  },
];

// Recursive Tree component
const TreeNode = ({ node }: { node: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex justify-between px-3 py-1 bottom-1">
        <div className="flex flex-row flex-1" onClick={toggleOpen}>
          <Image
            className={`my-1 mx-1 ${
              isOpen ? "rotate-90 filter-green" : "filter-yellow"
            }`}
            priority
            src="/Arrow.svg"
            height={20}
            width={20}
            alt=">"
          />{" "}
          {node.name}
        </div>
        <div> Flex End </div>
      </div>
      {isOpen && (
        <div style={{ marginLeft: "20px" }}>
          {node.children.map((childNode: any) => (
            <TreeNode key={childNode.id} node={childNode} />
          ))}
        </div>
      )}
    </div>
  );
};

// ToDO  Add Button ANd Form
// Create Server Action
// Database CRUD
// Thats it.
// Main App component
const App = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedModal, setSelectModal] = useState("");

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
        >
          <ModalContent>
            {(onClose) =>
              selectedModal === "AddCategory" ? (
                <AddCategory onClose={onClose} />
              ) : (
                <AddProgram onClose={onClose} />
              )
            }
          </ModalContent>
        </Modal>
      </div>
      {treeData.map((rootNode) => (
        <TreeNode key={rootNode.id} node={rootNode} />
      ))}
    </div>
  );
};

export default App;
