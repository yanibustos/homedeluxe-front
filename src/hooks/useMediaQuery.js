import { useState, useEffect } from "react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQueryList = window.matchMedia(query);

      const handleChange = (event) => {
        setMatches(event.matches);
      };

      mediaQueryList.addEventListener("change", handleChange);

      setMatches(mediaQueryList.matches);

      return () => {
        mediaQueryList.removeEventListener("change", handleChange);
      };
    }
  }, [query]);

  return matches;
}

export default useMediaQuery;
