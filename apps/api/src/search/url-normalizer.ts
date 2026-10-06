export const normalizeUrl = (url: string): string => {
    const parsedURL = new URL(url);
    
    parsedURL.hash = ""

    return parsedURL.toString().replace(/\/$/,"");
}