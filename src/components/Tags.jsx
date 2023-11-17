import { useEffect, useState } from "react";
import { getAllTags } from "../services/tagService";

export const Tags = () => {
  const [allTags, setAllTags] = useState([
    {
      id: 1,
      label: "Network Not Online",
    },
  ]);

  useEffect(() => {
    getAllTags().then((tagsArray) => {
      setAllTags(tagsArray);
    });
  }, []);

  return <div className="__tags-container__ flex flex-col w-7/12">
    <div className="__tags-header__ text-3xl bg-cyan-800 text-white py-2 px-12 self-center rounded-t-lg">Tags</div>
    <div className="__tags-list__ flex flex-wrap gap-4 bg-cyan-950/60 border border-white/40 py-20 items-center justify-center rounded-lg">
    {allTags.map((tag) => {
          return <div className="__tags-item__ bg-cyan-500 py-1 px-2 text-cyan-950" key={tag.id}>{tag.label}</div>;
        })}
    </div>
  </div>;
};
