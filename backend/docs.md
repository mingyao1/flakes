# API Documentation

This is the comprehensive API documentation for the Flakes backend server.

All date strings should be formatted like `2021-01-01 23:59:59`

## GET /

Hello, world!

## GET /get-assets

Optional Query Params:

- `asset_type`: int
- `mfr`: int
- `install_date`: date string
- `last_serviced_date`: date string
- `floor_no`: int
- `room_no`: int

Get assets with any exact match to provided optional query parameters.

## GET /get-asset-predictions

Required Query Params:

- `days_in_future`: int

Optional Query Params:

- `id`: int multiple/list

Get predicted value of work_orders_in_future (as in the increase of the work orders between now and days_in_future days from now) for each asset id provided.

If no ids are provided, it will return the expected value for all assets in database.

## GET /search

Required Query Params:

- `query`: string

Search all assets for any string containing the query.
