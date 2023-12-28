"use client";
import React, { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import TreeView, { flattenTree } from "react-accessible-treeview";
import cx from "classnames";

const folder = {
  name: "",
  children: [
    {
      name: "Fruits",
      children: [
        { name: "Avocados" },
        { name: "Bananas" },
        { name: "Berries" },
        { name: "Oranges" },
        { name: "Pears" },
        { name: "Portfolio" },
      ],
    },
    {
      name: "Drinks",
      children: [
        { name: "Apple Juice" },
        { name: "Chocolate" },
        { name: "Coffee" },
        {
          name: "Tea",
          children: [
            { name: "Black Tea" },
            { name: "Green Tea" },
            { name: "Red Tea" },
            { name: "Matcha" },
          ],
        },
      ],
    },
    {
      name: "Vegetables",
      children: [
        { name: "Beets" },
        { name: "Carrots" },
        { name: "Celery" },
        { name: "Lettuce" },
        { name: "Onions" },
      ],
    },
  ],
};

const data = flattenTree(folder);

function ControlledExpandedNode() {
  const [expandedIds, setExpandedIds] = useState();

  return (
    <div>
      <div>
        <label htmlFor="txtIdsToExpand">
          Comma-delimited list of branch node IDs to expand:
        </label>
      </div>
      <div className="checkbox">
        <TreeView
          data={data}
          aria-label="Controlled expanded node tree"
          expandedIds={expandedIds}
          defaultExpandedIds={[1]}
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            isDisabled,
            getNodeProps,
            level,
            handleExpand,
          }) => {
            return (
              <div
                {...getNodeProps({ onClick: handleExpand })}
                style={{
                  marginLeft: 40 * (level - 1),
                  opacity: isDisabled ? 0.5 : 1,
                }}
              >
                {isBranch && <ArrowIcon isOpen={isExpanded} />}
                <span className="name">
                  {element.name}-{element.id}
                </span>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}

const ArrowIcon = ({
  isOpen,
  className,
}: {
  isOpen: boolean;
  className?: string;
}) => {
  const baseClass = "arrow";
  const classes = cx(
    baseClass,
    { [`${baseClass}--closed`]: !isOpen },
    { [`${baseClass}--open`]: isOpen },
    className
  );
  return <IoMdArrowDropright className={classes} />;
};

export default ControlledExpandedNode;
