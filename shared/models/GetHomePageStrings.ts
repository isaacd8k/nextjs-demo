import { DocumentNode, gql } from "@apollo/client";

export type HomePageSchema = {
  id: string;
  pageTitle: string;
  tapToContinuePrompt: string;
  welcomeText: string;
};

export type MultiLangData = {
  [key: string]: Omit<HomePageSchema, "id">;
};

const query = (locale = "en") => {
  return gql`
      query {
        homePage(locale:"${locale}"){
          id
          pageTitle
          tapToContinuePrompt
          welcomeText          
        }    
      }  
  `;
};

/* Query builder for requesting each configured locale in single query */
const getMultiLangQuery = (locales: string[]): DocumentNode => {
  let multiLangQuery = "";
  locales.forEach((locale) => {
    multiLangQuery += `
      ${locale}: homePage(locale: "${locale}") {
        pageTitle
        tapToContinuePrompt
        welcomeText
      }
    `;
  });

  return gql`    
    query MultiLangQuery {
      ${multiLangQuery}
    }
  `;
};

export { getMultiLangQuery };
export default query;
