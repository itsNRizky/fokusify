import React from "react";
import { Drawer } from "vaul";

type Props = {
  children: React.ReactNode;
  button: React.ReactNode;
};

const BottomSheet = (props: Props) => {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>{props.button}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <div className="fixed bottom-3 left-0 right-0 flex justify-center">
          <Drawer.Content className="flex flex-col rounded-[10px]">
            <div className="flex-1 rounded-lg bg-white p-4">
              {props.children}
            </div>
          </Drawer.Content>
        </div>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default BottomSheet;
