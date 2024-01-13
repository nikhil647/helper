import { Spinner } from "@nextui-org/react";

const Loading = () => (
  <div className="blur-[1px] h-[80vh] w-full">
    <div className="fixed -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4">
      {" "}
      <Spinner size="lg" color="warning" />{" "}
    </div>
  </div>
);

export default Loading;
