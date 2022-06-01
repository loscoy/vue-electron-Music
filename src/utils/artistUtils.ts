export const handleArtist = (artistarr: any) => {
  const length = artistarr.length;
  let artist: string = "";
  const handle1 = () => {
    artistarr.forEach((item: any, index: any) => {
      if (index < length - 1) {
        artist += item.name + " / ";
      } else {
        artist += item.name;
      }
    });
  };
  const handle2 = () => (artist = artistarr[0].name);
  length > 1 ? handle1() : handle2();
  return artist;
};
