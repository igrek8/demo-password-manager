import { decryptDataSafe } from './cipher';

const decryptResource = (secret, resource) => {
  return {
    ...resource,
    records: resource.records.map((record) => {
      return {
        ...record,
        data: decryptDataSafe(secret, record.data),
      };
    }),
  };
};

export default decryptResource;
