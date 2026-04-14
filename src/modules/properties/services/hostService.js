import { hostsData } from '../data/hosts'; 

export const getHostById = (id) => {
  return hostsData.find(host => host.id === parseInt(id));
};