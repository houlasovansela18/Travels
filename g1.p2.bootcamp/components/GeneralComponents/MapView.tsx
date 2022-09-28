import { NextPage } from "next";
import Map, {
	Marker,
	FullscreenControl,
	AttributionControl,
	GeolocateControl,
	NavigationControl,
	ScaleControl,
} from "react-map-gl";
import { FaChevronCircleLeft } from "react-icons/fa";
import "mapbox-gl/dist/mapbox-gl.css";
import PostCard from "./CardComponents/PostCard";
import FloatModalToggle from "./Button/FloatModalToggle";
import { useGeolocated } from "react-geolocated";
import { useState } from "react";
import { MapCollection } from "../../utils/map";
import { property } from "../../utils/types/global.d";

interface Props {
	properties: Array<property>;
	width?: number;
	height?: number;
	authUser: string;
}
const MapView: NextPage<Props> = ({ properties, width, height, authUser }) => {
	const { coords, isGeolocationAvailable, isGeolocationEnabled } =
		useGeolocated({
			positionOptions: {
				enableHighAccuracy: false,
			},
			userDecisionTimeout: 5000,
		});
	const [selected, setSelected] = useState<property>();
	const [mapStyleIndex, setMapStyleIndex] = useState(0);
	// const parkLayer = {
	// 	id: "landuse_park",
	// 	type: "fill",
	// 	source: "mapbox",
	// 	"source-layer": "landuse",
	// 	filter: ["==", "class", "park"],
	// 	paint: {
	// 		"fill-color": "#4E3FC8",
	// 	},
	// };
	return !isGeolocationAvailable ? (
		<div>Your browser does not support Geolocation</div>
	) : !isGeolocationEnabled ? (
		<div>Geolocation is not enabled</div>
	) : coords ? (
		<div>
			<Map
				initialViewState={{
					latitude: coords.latitude,
					longitude: coords.longitude,
					zoom: 5,
				}}
				style={{ width: width || "99vw", height: height || "100vh" }}
				mapStyle={MapCollection[mapStyleIndex]}
				mapboxAccessToken={
					process.env.MAPBOX_ACCESS_TOKEN ||
					"pk.eyJ1IjoiaG91bGFzb3ZhbnNlbGEiLCJhIjoiY2w3eXRjb2dzMDIybDN2cHI1Y3ExZzJ3eiJ9.8k2mdqrJofofKtd4hvIqpg"
				}
				attributionControl={false}
			>
				{properties.map((property) => {
					return (
						<Marker
							latitude={property.coordination[0]}
							longitude={property.coordination[1]}
							key={property._id}
							onClick={() => {
								setSelected(property);
							}}
						>
							<span
								className={
									property._id === selected?._id
										? "text-sm text-white px-2 py-2 bg-black border-1 border-white rounded-full font-mono font-bold shadow"
										: "text-sm text-white px-2 py-2 bg-gradient-to-r hover:bg-gradient-to-tr from-indigo-500 via-white-500 to-teal-500 border-1 border-white rounded-full font-mono font-bold shadow"
								}
							>
								{"$"}
								{Math.round(
									property.price - (property.price * property.discount) / 100
								)}
							</span>
						</Marker>
					);
				})}
				{selected ? (
					<Marker
						latitude={selected.coordination[0]}
						longitude={selected.coordination[1]}
					>
						<div className="absolute ml-8 h-full shadow z-50 w-72">
							<button
								className="absolute z-50 text-white mt-4 ml-4 rounded-full text-xl shadow"
								onClick={() => setSelected(undefined)}
							>
								<span>
									<FaChevronCircleLeft size={24} />
								</span>
							</button>
							<PostCard data={selected} authUser={authUser} />
						</div>
					</Marker>
				) : null}
				{/* {selected ? (
					<Popup
						latitude={coords.latitude}
						longitude={coords.longitude}
						// closeOnMove={true}
						// closeOnClick={true}
						// onClose={() => {
						// 	console.log("close Popup");
						// 	setSelected(null);
						// }}
					>
						<div className="h-96 w-96">
							<PostCard data={selected} authUser={authUser} />
						</div>
					</Popup>
				) : null} */}
				<FullscreenControl />
				{/* <Layer {...parkLayer} /> */}
				<AttributionControl customAttribution="Design by HOULA SOVANSELA" />
				<GeolocateControl />
				<ScaleControl />
				<NavigationControl />
			</Map>
			<FloatModalToggle
				mapStyleIndex={mapStyleIndex}
				setMapStyleIndex={setMapStyleIndex}
			/>
			{/* <BottomSheet open={true}>My awesome content here</BottomSheet> */}
		</div>
	) : (
		<div className="grid min-h-screen place-content-center">
			<div className="flex items-center gap-2 text-gray-500">
				<span className="h-6 w-6 block rounded-full border-4 border-t-blue-300 animate-spin"></span>
				loading...
			</div>
		</div>
	);
};

export default MapView;
