import { defineEnvVars } from '@sveltejs/kit/env';

const optional = (value: string | undefined) => value;

export const variables = defineEnvVars({
	PUBLIC_SANITY_PROJECT_ID: { public: true, static: true },
	PUBLIC_SANITY_DATASET: { public: true, static: true },
	PUBLIC_NAME: { public: true, static: true },
	PUBLIC_EVENT_IDEAS_FORM_URL: { public: true, schema: optional },
	GOOGLE_CALENDAR_API_KEY: { static: true },
	SANITY_TOKEN: { static: true, schema: optional }
});
