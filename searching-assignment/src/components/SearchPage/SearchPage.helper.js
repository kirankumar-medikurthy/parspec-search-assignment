export const truncate = (input, max) => {
  const truncatedText =
    input.length > max ? `${input.substring(0, max)}...` : input;
  return truncatedText;
};

export const getUserListInformation = async (
  url,
  setPlaceholder,
  setIsLoading
) => {
  try {
    const userListResponse = await fetch(url);
    const userListJson = await userListResponse.json();
    setPlaceholder(userListJson);
    setIsLoading(false);
    return userListJson;
  } catch (e) {
    console.error(e);
    setIsLoading(false);
  }
};

export const getHighlightedText = (text, highlight) => {
  // Split on highlight term and include term into parts, ignore case
  var invalid = /[°"§%()*\[\]{}=\\?´`'#<>|,;.:+_-]+/g;
  var filteredHighlight = highlight.replace(invalid, "");
  const parts = text?.split(new RegExp(`(${filteredHighlight})`, "gi"));
  return (
    <span>
      {" "}
      {parts?.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === highlight.toLowerCase()
              ? { color: "blue", fontWeight: "400" }
              : {}
          }
        >
          {part}
        </span>
      ))}{" "}
    </span>
  );
};
