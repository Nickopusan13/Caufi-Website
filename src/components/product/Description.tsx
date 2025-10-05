"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ProductDescription({
  productDetails,
  careGuide,
}: {
  productDetails: string;
  careGuide: string;
}) {
  const [selected, setSelected] = useState("details");
  return (
    <div className=" text-black mt-5 dark:text-white">
      <div className="flex gap-8">
        <button
          className={selected === "details" ? "font-bold border-b-2" : ""}
          onClick={() => setSelected("details")}
        >
          Product Detail
        </button>
        <button
          className={selected === "care" ? "font-bold border-b-2" : ""}
          onClick={() => setSelected("care")}
        >
          Care Guide
        </button>
        <button
          className={selected === "reviews" ? "font-bold border-b-2" : ""}
          onClick={() => setSelected("reviews")}
        >
          Reviews
        </button>
      </div>
      <div className="border-b"></div>
      <div className="mt-4 mb-10">
        {selected === "details" && (
          <div>
            <ReactMarkdown>{productDetails}</ReactMarkdown>
          </div>
        )}
        {selected === "care" && (
          <div>
            <ReactMarkdown>{careGuide}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
