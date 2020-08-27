## README

```
 $ npm i
 $ npm run start
 $ curl --location --request POST 'localhost:9000/campaign' \
   --header 'Content-Type: application/json' \
   --data-raw '{
       "name": "test",
       "description": "description",
       "startDate": "2020-08-25T20:37:33.117Z",
       "endDate": "2020-08-25T20:37:33.117Z"
   }'
```