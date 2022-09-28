import { NextPage } from "next";
import ListView from "../GeneralComponents/ListView";
import MapView from "../GeneralComponents/MapView";

interface Props {
	isMapView: boolean;
	properties: any;
	authUser: string;
}

const BodyComponent: NextPage<Props> = ({
	isMapView,
	properties,
	authUser,
}) => {
	return isMapView ? (
		<MapView properties={properties} authUser={authUser} />
	) : (
		<ListView properties={properties} authUser={authUser} />
	);
};

export default BodyComponent;
