import React from "react";
import DraggableCard from "../ui/draggableCard";
import { Button } from "../ui/button";
import { IoRemoveOutline } from "react-icons/io5";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useBoardStore } from "@/store/boardStore";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

type Props = {};

const YoutubeCard = (props: Props) => {
  const [showYoutube, setShowYoutube] = useBoardStore((state) => [
    state.showYoutube,
    state.setShowYoutube,
  ]);
  const [urlInput, setUrlInput] = React.useState("");
  const [url, setUrl] = React.useState("");
  const visibleHandler = () => {
    const newVisible = showYoutube ? false : true;
    setShowYoutube(newVisible);
  };

  const searchUrlHandler = () => {
    setUrl(urlInput);
  };
  return (
    <DraggableCard
      className={`w-80 ${showYoutube ? "" : "hidden"}`}
      key={"youtube"}
      draggableId="youtube"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Youtube</h3>
        <div className="w-3/4"></div>
        <Button onClick={visibleHandler} size={"icon"} variant={"link"}>
          <IoRemoveOutline className="h-6 w-6" />
        </Button>
      </div>
      <form className="flex items-center gap-2">
        <Input
          className="w-10/12"
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="https://www.youtube.com/watch?v="
        />
        <Button onClick={searchUrlHandler} type="button" size={"icon"}>
          <Search />
        </Button>
      </form>
      {url === "" ? (
        <div className="mt-4">
          <p>Put url to display the youtube video here</p>
        </div>
      ) : (
        <Card className="mt-4">
          <iframe
            src={`${convertWatchToEmbedUrl(url)}`}
            allowFullScreen={false}
          ></iframe>
        </Card>
      )}
    </DraggableCard>
  );
};

function convertWatchToEmbedUrl(watchUrl: string) {
  const url = new URL(watchUrl);
  const videoId = url.searchParams.get("v");
  return `https://www.youtube.com/embed/${videoId}`;
}

export default YoutubeCard;
