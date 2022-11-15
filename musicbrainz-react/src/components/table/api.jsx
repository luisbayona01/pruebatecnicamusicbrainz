export const getData= async (limit, offset, select = false) => {
        try {
          const fetchData = await fetch(
            `https://musicbrainz.org/ws/2/genre/all?limit=${limit}&offset=${offset}&fmt=json`,
          );
          const result = await fetchData.json();
            return result;
        } catch (err) {
          console.log(err);
        }
      };