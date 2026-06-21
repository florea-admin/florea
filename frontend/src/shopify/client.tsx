const SHOPIFY_URL =
  "https://florea-6999.myshopify.com/api/2026-04/graphql.json";


const SHOPIFY_TOKEN =
  "fd684abea48d65fceab385725d1ecc75"; // Storefront public access token


export async function shopifyFetch(query:string, variables={}) {

  const response = await fetch(
    SHOPIFY_URL,
    {
      method:"POST",

      headers:{
        "Content-Type":"application/json",
        "X-Shopify-Storefront-Access-Token":
            SHOPIFY_TOKEN
      },

      body:JSON.stringify({
        query,
        variables
      })
    }
  );


  const json = await response.json();

  return json.data;

}