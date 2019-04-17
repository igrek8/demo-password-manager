import { encryptData } from './cipher';

const encryptResource = (secret, resource) => {
  return {
    ...resource,
    records: resource.records.map((record) => {
      return {
        ...record,
        data: encryptData(secret, record.data),
      };
    }),
  };
};

export default encryptResource;
