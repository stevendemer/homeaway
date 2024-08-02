"use client";

import { Button } from "../ui/button";
import { useState } from "react";

const Comment = ({ comment }: { comment: string }) => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!isExpanded);
  };

  const longComment = comment.length > 30;
  const displayComment =
    longComment && !isExpanded ? `${comment.slice(0, 50)}...` : comment;

  return (
    <div>
      <p className="text-sm">{displayComment}</p>
      {longComment && (
        <Button
          variant="link"
          className="pl-0 text-muted-foreground"
          onClick={toggleExpanded}
        >
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  );
};

export default Comment;
