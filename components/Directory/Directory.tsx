import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useEffect } from "react";

import LocationResults from "./components/LocationResults";
import DirectoryMap from "./components/DirectoryMap";

import { Props } from "./../../pages/directory";
import useMapUIStore from "./useMapUIStore";
// TODO: CONVERT TO USING TWIN.MACRO FOR CLASSNAMES
// TODO: FIX ERROR CHECKING AND HANDLING AT PAGE-LEVEL DIRECTORY.JS

import { AmenityId as AMENITY_ID } from "./../../pages/directory";
import { MotionFadeEnter } from "./../../shared/animations/pages/onPageLoad";
import Head from "next/head";

export default function Map({
  strings,
  mapConfig,
  amenityData,
  maps,
  locationData,
}: Props) {
  const router = useRouter();

  // shared state
  const selectAmenity = useMapUIStore((state) => state.selectAmenity);
  const selectLevel = useMapUIStore((state) => state.selectLevel);
  const setAvailableLevels = useMapUIStore((state) => state.setAvailableLevels);

  // load available levels & set default
  useEffect(() => {
    setAvailableLevels(locationData);

    // initialize selected level as first available level
    if (locationData && locationData?.length > 0) {
      selectLevel(locationData[0].level_name);
    }
  }, [setAvailableLevels, locationData, selectLevel]);

  // on URL change
  useEffect(() => {
    // amenityId in url should be a valid selection (ts)
    const amenityId = router.query.amenityId as AMENITY_ID;

    // validate selection
    if (amenityId && amenityData[amenityId]) {
      selectAmenity(amenityId);
    } else {
      selectAmenity(null);
    }
  }, [router, amenityData, selectAmenity]);

  return (
    <motion.div {...MotionFadeEnter} className="self-stretch w-full">
      <Head>
        <title>{strings.pageTitle}</title>
      </Head>
      <main className="h-full">
        <header className="text-center p-2 mb-4">
          <h1 className="text-2xl text-blue-50 pb-2">{strings.pageTitle}</h1>
          <p className="text-md text-gray-300">{strings.pageDescription}</p>
        </header>

        {/* Map view */}
        <div
          className={`
            grid grid-cols-1 w-full bg-gray-500 bg-opacity-30
            md:grid-cols-mapWithResults rounded-t-2xl overflow-hidden
          `}
        >
          <LocationResults
            amenityData={amenityData}
            locationData={locationData}
            tapWidget={strings.tapWidget}
          />

          <DirectoryMap
            maps={maps}
            locationData={locationData}
            mapConfig={mapConfig}
          />
        </div>
      </main>
    </motion.div>
  );
}
