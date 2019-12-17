# bigquery-buffer

BigQuery insert buffer

## Install

```bash
npm install bigquery-buffer
```

## Usage

```ts
const buffer = new BigQueryBuffer(
  new BigQuery(),
  "dataset",
  "table"
)
```

## Push a record

```ts
buffer.push({ myColumn: true })
```

## Limits

```ts
buffer.recordLimit = 500 // records
buffer.timeLimit = 1000 // milliseconds
```
