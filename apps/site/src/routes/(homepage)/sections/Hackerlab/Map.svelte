<script lang="ts">
	import 'maplibre-gl/dist/maplibre-gl.css';

	import { assets } from '$app/paths';
	import { onMount } from 'svelte';

	import maplibreGl from 'maplibre-gl';
	const { Map, NavigationControl, AttributionControl } = maplibreGl;
	import * as pmtiles from 'pmtiles';
	import layers from 'protomaps-themes-base';

	let mapContainer: HTMLDivElement = $state();

	const lng = -117.844285,
		lat = 33.642956;

	onMount(() => {
		maplibreGl.addProtocol('pmtiles', new pmtiles.Protocol().tile);

		const map = new Map({
			container: mapContainer,
			style: {
				version: 8,
				glyphs: 'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
				sources: {
					protomaps: {
						type: 'vector',
						url: `pmtiles://${assets}/maps/hackerlab-20240121.pmtiles`,
						attribution:
							'<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
					}
				},
				layers: [
					...layers('protomaps', 'light'),
					{
						id: '3d-buildings',
						source: 'protomaps',
						'source-layer': 'buildings',
						type: 'fill-extrusion',
						minzoom: 15,
						paint: {
							'fill-extrusion-color': '#4f9adb',
							'fill-extrusion-height': {
								type: 'identity',
								property: 'height'
							},
							'fill-extrusion-base': {
								type: 'identity',
								property: 'min_height'
							},
							'fill-extrusion-opacity': 0.25
						}
					}
				]
			},
			center: [lng, lat],
			maxBounds: [
				[lng - 0.2, lat - 0.2],
				[lng + 0.2, lat + 0.2]
			],
			zoom: 16,
			minZoom: 12,
			bearing: 0,
			pitch: 60,
			attributionControl: false,
			scrollZoom: false,
			failIfMajorPerformanceCaveat: true
		});
		map.addControl(new NavigationControl({}), 'top-right');
		map.addControl(new AttributionControl({ compact: true }), 'bottom-right');

		new maplibreGl.Marker({
			color: '#4f9adb'
		})
			.setLngLat([lng, lat])
			.addTo(map);

		return () => {
			maplibreGl.removeProtocol('pmtiles');
			map.remove();
		};
	});
</script>

<div class="map" bind:this={mapContainer}></div>

<style lang="scss">
	.map {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: 1;
	}
</style>
