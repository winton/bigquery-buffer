import { BigQuery, Table } from "@google-cloud/bigquery"

export class BigQueryBuffer {
  bufferLimit = 500
  flushInterval = 10000

  buffer: Record<string, any>[]
  table: Table
  timeout: NodeJS.Timeout

  constructor(
    bq: BigQuery,
    dataset: string,
    table: string,
    flushInterval?: number
  ) {
    this.buffer = []
    this.table = bq.dataset(dataset).table(table)

    this.timeout = setInterval(
      this.flush.bind(this),
      flushInterval || this.flushInterval
    )
  }

  async push(record: Record<string, any>): Promise<any> {
    this.buffer.push(record)

    if (this.buffer.length >= this.bufferLimit) {
      return this.flush()
    }
  }

  async flush(): Promise<any> {
    if (!this.buffer.length) {
      return
    }

    const buffer = this.buffer
    this.buffer = []

    return this.table.insert(buffer)
  }

  async close(): Promise<any> {
    clearTimeout(this.timeout)
    return this.flush()
  }
}
