import makeGraphQLRequest from '../utils/makeGraphQLRequest';
import GetMenuStrings from '../shared/queries/GetMenuStrings';
import Map from '../components/Map';

/* EXPORT COMPONENT */
export default Map;


/* SERVER SIDE CONFIG */
export async function getStaticProps({ locale, locales }) {
  // make request for strings on Strapi
  const data = await makeGraphQLRequest(locale, GetMenuStrings);

  // handle request errors with 404
  if (!data || !data.menuString) {
    return { notFound: true }
  }

  // pass down data into component props
  return {
    props: {
      strings: data.menuString,
      locale,
      locales
    }
  }
}