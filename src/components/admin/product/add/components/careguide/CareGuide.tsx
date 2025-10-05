"use client";

import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { memo } from "react";
import RichText from "../RichText";

export default memo(function CareGuide({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          Care Guide <span className="opacity-40">(Optional)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <RichText
          value={value}
          onChange={onChange}
          placeholder="Write a care guide here..."
        />
      </CardContent>
    </Card>
  );
});
