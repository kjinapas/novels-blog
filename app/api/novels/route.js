import axios from 'axios'
const headers = {
    'api-key': process.env.API_KEY
  };

export async function GET(){
    const get_Blog =
    await axios.get('https://opend.data.go.th/get-ckan/datastore_search_sql?sql=SELECT * from "88018d39-7edc-4ffd-9124-2d6e5170ef92"',
    {
      headers:headers
    })

    return Response.json({blogs:get_Blog.data.result.records})
}