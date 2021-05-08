if (keyword == undefined) {
  const { data } = await axios.get("/api/products");
} else {
  const { data } = await axios.get(`/api/products?keyword=${keyword}`);
}

const { data } = await (keyword === undefined
  ? axios.get("/api/products")
  : axios.get(`/api/products?keyword=${keyword}`));
