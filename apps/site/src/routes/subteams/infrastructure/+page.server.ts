import type { PageServerLoad } from './$types';
// import { client } from '$lib/sanity/sanityClient';
// import { defineQuery } from 'groq';

interface NetdataResponse {
	api: number;
	id: string;
	name: string;
	view_update_every: number;
	result: {
		labels: string[];
		data: number[][];
	};
}

export const load: PageServerLoad = async () => {
	const NETDATA_API =
		'ndc.PGAmw5m1dDou4TQjwWzmGFEwUpZIawFPqtl879ENzwe8s6HLRImrkDGOyv7UywJH0dCRZuTq56mBGMyjjRnPeFnUMSlKpSS6FcWRvyrJa4oE6baM738M1wFxVlJUYvel';
	// const BASE_URL = "https://app.netdata.cloud/graphql";

	// const spaceId = "bd211cad-0bbc-4b7f-980a-4aab8e01fe0a";
	const roomId = '1686f8bd-c0fe-4bdd-8154-df29e88c1fd0';

	const url = `https://netdata.cloud{spaceId}/rooms/${roomId}/data?contexts=system.cpu&after=-600`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${NETDATA_API}`
			}
		});

		if (!response.ok) {
			throw new Error(`Error fetching metrics: ${response.statusText}`);
		}

		const data: NetdataResponse = await response.json();
		return data;
	} catch (error) {
		console.error('Failed to fetch Netdata Cloud metrics:', error);
		return null;
	}

	// const roomsResponse = await fetch(`https://app.netdata.cloud/api/v2/spaces/${spaceId}/rooms`, {
	//     headers: { 'Authorization': `Bearer ${NETDATA_API}` }
	// });

	// const rooms = await roomsResponse.json();
	// const roomId = rooms[0].id; // The UUID for your room
	// console.log(roomId);
};

// TOKEN="ndc.PGAmw5m1dDou4TQjwWzmGFEwUpZIawFPqtl879ENzwe8s6HLRImrkDGOyv7UywJH0dCRZuTq56mBGMyjjRnPeFnUMSlKpSS6FcWRvyrJa4oE6baM738M1wFxVlJUYvel"
// SPACE="bd211cad-0bbc-4b7f-980a-4aab8e01fe0a"
// ROOM="1686f8bd-c0fe-4bdd-8154-df29e88c1fd0"

// curl -H "Authorization: Bearer $TOKEN" \
// https://app.netdata.cloud/api/v2/spaces

// echo ""

// # curl -H "Authorization: Bearer $TOKEN" \
// #   "https://app.netdata.cloud/api/v3/spaces/$SPACE/nodes"

// curl -s -X POST \
//   -H 'Content-Type: application/json' \
//   -H "Authorization: Bearer $TOKEN" \
//   "https://app.netdata.cloud/api/v3/spaces/$SPACE/rooms/$ROOM/data" \
//   -d '{
//     "scope": { "contexts": ["system.cpu"] },
//     "selectors": { "nodes": ["*"], "contexts": ["*"], "instances": ["*"], "dimensions": ["*"], "labels": ["*"], "alerts": ["*"] },
//     "window": { "after": -600, "before": 0, "points": 10 },
//     "aggregations": {
//       "metrics": [{ "group_by": ["node"], "aggregation": "sum" }],
//       "time": { "time_group": "average" }
//     },
//     "format": "json2",
//     "options": ["jsonwrap", "minify", "unaligned"],
//     "timeout": 30000
//   }' >> output.txt
