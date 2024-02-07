import data from '../../test_data/clips_data.json';

export const getClips = () =>
  new Promise((resolve, reject) => {
    // return data from clipsData.json locally for now
    resolve(data);
  });
