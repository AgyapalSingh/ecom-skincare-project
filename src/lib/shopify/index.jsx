// FILE USED TO EXPORT EVERYTHING FROM THE SHOPIFY FOLDER

export async function getMenu(handle) {
  const res = await shopifyFetch({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: {
      handle,
    },
  });

  return (
    (res.body && res.body.data && res.body.data.menu && res.body.data.menu.items
      ? res.body.data.menu.items.map((item) => ({
          title: item.title,
          path: item.url
            .replace(domain, "")
            .replace("/collections", "/search")
            .replace("/pages", ""),
        }))
      : []) || []
  );
}
