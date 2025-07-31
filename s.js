const data = require("./data/sirah/data.json");
const fs = require("fs");

fs.writeFileSync(
  "./data/sirah/data.json",
  JSON.stringify(
    data.map((val, idx) => ({ ...val, page: idx + 1, idx: undefined })),
    null,
    2
  )
);
