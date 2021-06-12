const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query = {}) {
    const headers = { 'Content-Type': 'application/json' }

    const res = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
        }),
    })

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    return json.data
}

export async function getAllPostsForHome() {
    const data = await fetchAPI(
        `
        query AllPosts {
          posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
            edges {
              node {
                title
                slug
                date
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                author {
                  node {
                    name
                    firstName
                    lastName
                    avatar {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      `
    )

    return data?.posts
}

export async function getHowToPost() {
    const data = await fetchAPI(
        `
        {
            post(id: 10, idType: DATABASE_ID) {
              content
            }
          }
      `
    )

    return data?.post
}