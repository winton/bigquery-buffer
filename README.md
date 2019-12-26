# bigquery-buffer

BigQuery insert buffer

## Install

```bash
npm install bigquery-buffer
```

## Usage

```ts
import { BigQuery } from "@google-cloud/bigquery"
import { BigQueryBuffer } from "bigquery-buffer"

const buffer = new BigQueryBuffer(
  new BigQuery(),
  "dataset",
  "table"
)

buffer.push({ myColumn: true })
```

## Limits

```ts
buffer.recordLimit = 500 // records
buffer.timeLimit = 1000 // milliseconds
```
