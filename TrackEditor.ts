class TrackEditor {
  track: Track = null;
  versionning: Track[] = [];

  constructor(track: Track) {
    this.track = track;
  }

  // #region Private methods
  private updateVersionning() {
    if (this.versionning.length === 5) {
      const newVersionning = this.versionning.filter((_, index) => index > 0);
      this.versionning = newVersionning;
    }

    this.versionning.push({ ...this.track });
  }
  // #endregion

  // #region Public methods
  /**
   * Restore specific track version and update versions order
   * @param indexVersion : track version to restore
   * @returns track or null
   */
  restoreVersion(indexVersion: number) {
    if (indexVersion < 5) {
      this.track = this.versionning[indexVersion];
      // Update versionning array
      const newVersionning = this.versionning.filter(
        (_, index) => index !== indexVersion
      );
      this.versionning = newVersionning;
      this.versionning.push({ ...this.track });
      return this.track;
    }
    return null;
  }

  setName(name: string) {
    this.track.name = name;
    this.updateVersionning();
    return this.track;
  }

  setDuration(duration: number) {
    this.track.duration = duration;
    this.updateVersionning();
    return this.track;
  }

  setReleaseDate(releaseDate: string) {
    this.track.releaseDate = releaseDate;
    this.updateVersionning();
    return this.track;
  }

  setArtists(artists: string[]) {
    this.track.artists = artists;
    this.updateVersionning();
    return this.track;
  }

  setAlbumName(albumName: string) {
    this.track.albumName = albumName;
    this.updateVersionning();
    return this.track;
  }

  setAllData(
    name: string,
    duration: number,
    releaseDate: string,
    artists: string[],
    albumName: string
  ) {
    this.track.name = name;
    this.track.duration = duration;
    this.track.releaseDate = releaseDate;
    this.track.artists = artists;
    this.track.albumName = albumName;
    this.updateVersionning();
    return this.track;
  }
  // #endregion
}
