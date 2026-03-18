//@ts-ignore
import { ViewStyle, StyleProp } from "react-native/types";
import { Ref } from "react";

type ProgressEvent = {
  distanceRemaining: number;
  distanceTraveled: number;
  durationRemaining: number;
  fractionTraveled: number;
};

type Route = {
  distance: number;
  expectedTravelTime: number;
  legs: Array<{
    source?: { latitude: number; longitude: number };
    destination?: { latitude: number; longitude: number };
    steps: Array<{
      shape?: {
        coordinates: Array<{ latitude: number; longitude: number }>;
      };
    }>;
  }>;
};

type Routes = {
  mainRoute: Route;
  alternativeRoutes: Route[];
};

type LocationChangeEvent = {
  latitude: number;
  longitude: number;
  heading?: number;
  speed?: number;
};

export type ExpoMapboxNavigationViewRef = {
  recenterMap: () => void;
};

export type ExpoMapboxNavigationViewProps = {
  ref?: Ref<ExpoMapboxNavigationViewRef>;
  coordinates: Array<{ latitude: number; longitude: number }>;
  waypointIndices?: number[];
  useRouteMatchingApi?: boolean;
  locale?: string;
  routeProfile?: string;
  routeExcludeList?: string[];
  mapStyle?: string;
  mute?: boolean;
  /**
   * Maximum height of the vehicle in meters.
   * Used for route calculation to avoid roads with height restrictions (e.g., low bridges, tunnels).
   */
  vehicleMaxHeight?: number;
  /**
   * Maximum width of the vehicle in meters.
   * Used for route calculation to avoid roads with width restrictions.
   */
  vehicleMaxWidth?: number;
  /**
   * Maximum weight of the vehicle in metric tons.
   * Used for route calculation to avoid roads with weight restrictions (e.g., weak bridges).
   */
  vehicleMaxWeight?: number;
  initialLocation?: { latitude: number; longitude: number; zoom?: number };
  /**
   * The URL of the custom raster source to use for the map.
   * Should be a template string with {x}, {y}, {z} placeholders.
   * Example: "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
   */
  customRasterSourceUrl?: string;
  placeCustomRasterLayerAbove?: string;
  disableAlternativeRoutes?: boolean;
  followingZoom?: number;
  /**
   * Whether the navigation allows arriving on the opposite side of the street.
   * When true, the user can complete navigation even if they're on the opposite side of the destination.
   * Useful in urban areas where crossing the street might be difficult or unsafe.
   * @default false
   */
  allowsArrivingOnOppositeSide?: boolean;
  /**
   * Whether to show the end-of-route feedback UI when navigation completes.
   * When true, displays a rating/feedback screen after arriving at the destination.
   * @default true
   */
  showsEndOfRouteFeedback?: boolean;
  /**
   * Whether to hide the native trip progress bar at the bottom of the navigation view.
   * Useful when using a custom overlay to display trip progress.
   * On Android, hides the trip progress bar. On iOS, hides the bottom banner container.
   * @default false
   */
  hideTripProgress?: boolean;
  /**
   * Callback fired when the user's location changes during navigation.
   * Provides real-time updates of latitude, longitude, heading, and speed.
   */
  onLocationChange?: (event: { nativeEvent: LocationChangeEvent }) => void;
  onRouteProgressChanged?: (event: { nativeEvent: ProgressEvent }) => void;
  onCancelNavigation?: () => void;
  onWaypointArrival?: (event: {
    nativeEvent: ProgressEvent | undefined;
  }) => void;
  onFinalDestinationArrival?: () => void;
  onRouteChanged?: () => void;
  onUserOffRoute?: () => void;
  onRoutesLoaded?: (event: { nativeEvent: { routes: Routes } }) => void;
  onRouteFailedToLoad?: (event: {
    nativeEvent: { errorMessage: string };
  }) => void;
  style?: StyleProp<ViewStyle>;
  uiStyle?: "day" | "night";
};
