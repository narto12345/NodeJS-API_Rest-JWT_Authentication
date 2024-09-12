import fileSystem from "node:fs";

const fileReaderJson = (path) => {
  const rawdata = fileSystem.readFileSync(path);
  const dataJson = JSON.parse(rawdata);
  return dataJson;
};

export { fileReaderJson };
