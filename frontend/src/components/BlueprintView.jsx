import React from "react";

function BlueprintView({ src, title }) {
  return (
    <iframe
      src={src}
      title={title}
      style={{
        width: "45%",
        height: "500px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    ></iframe>
  );
}

export default BlueprintView;
