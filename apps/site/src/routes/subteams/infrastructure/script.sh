TOKEN="ndc.PGAmw5m1dDou4TQjwWzmGFEwUpZIawFPqtl879ENzwe8s6HLRImrkDGOyv7UywJH0dCRZuTq56mBGMyjjRnPeFnUMSlKpSS6FcWRvyrJa4oE6baM738M1wFxVlJUYvel"
SPACE="bd211cad-0bbc-4b7f-980a-4aab8e01fe0a"
ROOM="1686f8bd-c0fe-4bdd-8154-df29e88c1fd0"

curl -H "Authorization: Bearer $TOKEN" \
https://app.netdata.cloud/api/v2/spaces

echo ""

# curl -H "Authorization: Bearer $TOKEN" \
#   "https://app.netdata.cloud/api/v3/spaces/$SPACE/nodes"

curl -s -X POST \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $TOKEN" \
  "https://app.netdata.cloud/api/v3/spaces/$SPACE/rooms/$ROOM/data" \
  -d '{
    "scope": { "contexts": ["system.cpu"] },
    "selectors": { "nodes": ["*"], "contexts": ["*"], "instances": ["*"], "dimensions": ["*"], "labels": ["*"], "alerts": ["*"] },
    "window": { "after": -600, "before": 0, "points": 10 },
    "aggregations": {
      "metrics": [{ "group_by": ["node"], "aggregation": "sum" }],
      "time": { "time_group": "average" }
    },
    "format": "json2",
    "options": ["jsonwrap", "minify", "unaligned"],
    "timeout": 30000
  }' >> output.txt