import queryString from 'query-string';

const updateQueryParams = (url, queryObject) => {
    if (url.indexOf('?') === -1) {
        return url + '?' + queryString.stringify(queryObject);
    } else {
        Object.entries(queryObject).forEach(entry => {
            const [key, value] = entry;
            const re = new RegExp(`([?&])${key}=.*?(&|$)`);
            if (url.match(re)) {
                url = url.replace(re, `$1${key}=${value}$2`);
            } else {
                url = url + `&${key}=${value}`;
            }
        });
        return url;
    }
};

export default updateQueryParams;
