import { NextFunction, Request, Response } from "express";
import { escapeTag } from "./escapeTag";

const sanitizeData = (keys: string[], input: Record<string, any>) => {
  const incomingData = Object.values(input);
  const outputData = incomingData.map((data) =>
    typeof data === "string" ? escapeTag(data) : data
  );
  const fixedData: any = {};
  keys.forEach((k, i) => {
    fixedData[k] = outputData[i];
  });
  return fixedData;
};

export const sanitize = (req: Request, _: Response, next: NextFunction) => {
  const queryKeys = Object.keys(req.query);
  const paramKeys = Object.keys(req.params);
  const bodyKeys = Object.keys(req.body);
  if (queryKeys.length > 0) {
    req.query = sanitizeData(queryKeys, req.query);
  }
  if (paramKeys.length > 0) {
    req.params = sanitizeData(paramKeys, req.params);
  }
  if (bodyKeys.length > 0) {
    req.body = sanitizeData(bodyKeys, req.body);
  }
  next();
};
