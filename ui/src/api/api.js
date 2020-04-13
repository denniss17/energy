export const getAll = async (resourceName) => {
    const response = await fetch(`/api/${resourceName}`);
    const payload = await response.json();

    // Transform to object with id as key and entity as value
    const entities = {};
    payload.data.forEach(meterReading => {
        entities[meterReading.id] = meterReading
    });
    return entities;
};

export const create = async (resourceName, entity) => {
    const response = await fetch(`/api/${resourceName}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(entity)
    });
    const payload = await response.json();

    if (!response.ok) {
        const error = new Error(response.statusText);
        error.payload = payload;
        throw error;
    }

    return payload != null && 'data' in payload ? payload.data : null;
}

export default {getAll, create};