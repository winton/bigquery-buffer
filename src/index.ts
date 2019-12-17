import { BigQuery, Table } from "@google-cloud/bigquery"

export class BigQueryBuffer {
  bufferLimit = 500
  timeLimit = 1000

  buffer: Record<string, any>[]
  table: Table
  timeout: NodeJS.Timeout

  constructor(
    bq: BigQuery,
    dataset: string,
    table: string
  ) {
    this.buffer = []
    this.table = bq.dataset(dataset).table(table)
  }

  async push(record: Record<string, any>): Promise<any> {
    this.buffer.push(record)

    if (this.buffer.length >= this.bufferLimit) {
      return this.flush()
    }
  }

  async flush(cb?: Function): Promise<any> {
    clearTimeout(this.timeout)

    this.timeout = setTimeout(
      () => this.flush(),
      this.timeLimit
    )

    if (!this.buffer.length) {
      return
    }

    const buffer = this.buffer
    this.buffer = []

    return this.table
      .insert(buffer)
      .then(insert => cb && cb(null, insert))
      .catch(err => (cb ? cb(err) : null))
  }

  async close(cb: Function): Promise<any> {
    clearTimeout(this.timeout)
    return this.flush(cb)
  }
}
