import { gql } from "@apollo/client";
import { LocationSchema } from "./GetMapStrings";

export type FirstAidSchema = {
  __typename: "FirstAid";
  id: string;
  name: string;
  isWheelchairAccessible: boolean;
  svgElemId?: string;
  note?: string;
  location: LocationSchema;
  featImg?: {
    url: string;
    width: number;
    height: number;
  };
};

const query = (locale = "en") => {
  return gql`
      query {
        firstAids(locale:"${locale}", sort:"location.level_num:asc"){
          __typename
          id
          name
          isWheelchairAccessible
          svgElemId
          note
          location {
            fullname
            level_name
            level_num
          }    
          featImg {
            url
            width
            height
          }
        }    
      }  
  `;
};

export default query;
