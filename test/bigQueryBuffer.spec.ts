import expect from "./expect"
import { BigQuery } from "@google-cloud/bigquery"
import { BigQueryBuffer } from "../src"

const fixture = (): [Record<string, any>, Promise<any>] => {
  let resolve: (s?: any) => void

  const promise = new Promise(r => (resolve = r))

  return [
    {
      dataset: (): Record<string, any> => ({
        table: (): Record<string, any> => ({
          insert: (...args: any[]): void => {
            resolve(args)
          },
        }),
      }),
    },
    promise,
  ]
}

describe("bigQueryBuffer", async () => {
  it("flushes", () => {
    const [bq, promise] = fixture()

    const buffer = new BigQueryBuffer(
      bq as BigQuery,
      "dataset",
      "table",
      1
    )

    buffer.push({ col: true })

    return promise.then(args => {
      buffer.close()
      expect(args).toEqual([[{ col: true }]])
    })
  })
})
