const giphyURL = "api.giphy.com/v1/stickers/search";

async function fetchStickerUrl(description, api = '') {
    const url = `${giphyURL}?api_key=${api}&q=${description}&limit=1&rating=g`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP request failed for sticker with status: ${response.status}`);

    const obj = await response.json();
    const imgs = obj.data[0].images;

    const stickerUrl = imgs?.fixed_height.url || imgs?.fixed_height.url || imgs?.downsized.url || imgs?.original.url;
    return stickerUrl;
}

export {fetchStickerUrl};