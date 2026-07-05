import { useEffect, useState } from "react";
import {
  extractUtmParams,
  readStoredUtmParams,
  storeUtmParams,
  type UtmParams,
} from "@/lib/palestre-utm";

// Captures UTM params from the URL on mount, persists them for the session,
// and returns whichever set is available (fresh URL params win over stored).
export function useUtmParams(): UtmParams {
  const [utm, setUtm] = useState<UtmParams>({});

  useEffect(() => {
    const fromUrl = extractUtmParams(window.location.search);
    storeUtmParams(fromUrl, window.sessionStorage);
    setUtm(
      Object.keys(fromUrl).length > 0
        ? fromUrl
        : readStoredUtmParams(window.sessionStorage),
    );
  }, []);

  return utm;
}
