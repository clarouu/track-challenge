class Track {
  id: string = "";
  name: string = "Untitle_track";
  releaseDate: string = null;
  duration: number = NaN;
  artists: string[] = [];
  albumName: string = "";

  constructor(
    name: string,
    releaseDate: string,
    duration: number,
    artists: string[],
    albumName: string
  ) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.duration = duration;
    this.artists = artists;
    this.albumName = albumName;
    this.id = `${name}_${albumName}_${releaseDate}`;
  }
}
