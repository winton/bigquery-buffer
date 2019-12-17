import expect from "./expect"
import { BigQueryBuffer } from "../src"
import { BigQuery } from "@google-cloud/bigquery"

describe("bigQueryBuffer", () => {
  it("should instantiate", () => {
    new BigQueryBuffer(new BigQuery(), "dataset", "table")
  })

  it("should assert", () => {
    expect(true).toBe(true)
  })
})
