export const getAll = async (resource) => {
    const response = await fetch(`/api/${resource}`);
    const content = await response.json();
    return content.data;
};

export default { getAll };