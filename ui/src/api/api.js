export const getAll = async (resource) => {
    const response = await fetch(`/api/${resource}`);
    const content = await response.json();

    // Transform to object with id as key and entity as value
    const entities = {};
    content.data.forEach(meterReading => {
        entities[meterReading.id] = meterReading
    });
    return entities;
};

export default { getAll };