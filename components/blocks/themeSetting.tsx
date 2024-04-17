import React, { useRef, useState, useTransition } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { IoSettingsOutline } from "react-icons/io5";
import { useThemeStore } from "@/store/themeStore";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { Upload } from "lucide-react";
import { uploadBackground } from "@/actions/boardBackground";
import { useBoardStore } from "@/store/boardStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {};

const ThemeSetting = (props: Props) => {
  const router = useRouter();
  const hiddenBackgroundInput = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("Change Background");
  const [isPending, startTransition] = useTransition();
  const [user] = useBoardStore((state) => [state.user]);
  const [style, boardBackground, setStyle] = useThemeStore((state) => [
    state.style,
    state.boardBackground,
    state.setStyle,
  ]);

  const uploadClickHandler: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();
    if (hiddenBackgroundInput.current) {
      hiddenBackgroundInput.current.click();
    }
  };

  const fileOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFileName(event.target.files[0].name);
    }
  };

  const uploadFileHandler = async (formData: FormData) => {
    const file = formData.get("background") as File;
    if (file.size === 0) {
      return;
    }

    startTransition(async () => {
      try {
        await uploadBackground(formData, boardBackground, user.id);
        toast.success("Background changed");
        router.refresh();
      } catch (err) {
        console.error(err);
      }
    });

    setFileName("Change Background");
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={style === "LIGHT" ? "secondary" : "default"}
          size={"icon"}
        >
          <IoSettingsOutline />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <ul>
          <form className="space-y-4" action={uploadFileHandler}>
            <li className="flex items-center justify-between">
              <p>Light / Dark Mode</p>
              <Switch
                checked={style === "DARK" ? true : false}
                onCheckedChange={() =>
                  setStyle(style === "DARK" ? "LIGHT" : "DARK")
                }
              />
            </li>
            <Separator className="bg-[#E5E5E8]" />
            <li>
              <>
                <Button
                  className="w-full space-x-2"
                  onClick={uploadClickHandler}
                  variant={"link"}
                  size={"lg"}
                >
                  <Upload className="h-4 w-4" />
                  <p className="">{fileName}</p>
                </Button>
                <input
                  ref={hiddenBackgroundInput}
                  onChange={fileOnChangeHandler}
                  className="hidden"
                  type="file"
                  name="background"
                />
              </>
            </li>
            <li>
              <Button disabled={isPending} className="w-full">
                {isPending ? "Uploading..." : "Save"}
              </Button>
            </li>
          </form>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeSetting;
